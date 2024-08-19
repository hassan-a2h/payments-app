import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { BalanceContext, BalanceProvider } from "../context/BalanceContext";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  if (!userId) navigate("/signin");

  return (
    <div className="">
      <Header userName={userName} />
      <hr />
      <BalanceProvider>
        <Balance />
        <Users />
      </BalanceProvider>
    </div>
  );
}

export default Dashboard;

function Header({ userName }) {
  return (
    <div className="flex flex-row px-4 py-2 justify-between items-center">
      <h1 className="font-bold text-lg">Payment App</h1>
      <div className="flex flex-row gap-4">
        <p className="text-lg">Hello, {userName}</p>
        <button className="rounded-2xl bg-slate-300 h-7 w-7">U</button>
      </div>
    </div>
  );
}

function Balance() {
  const { balance } = useContext(BalanceContext);

  return <div className="p-4">Your Balance: {balance}</div>;
}

function Users() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <SearchUsers setUsers={setUsers} />
      <DisplayUsers users={users} />
    </div>
  );
}

function SearchUsers({ setUsers }) {
  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;

    if (!searchTerm) {
      setUsers([]);
      return;
    }

    const response = await axios.get(`/api/v1/user/bulk?email=${searchTerm}`, {
      withCredentials: true,
    });

    response?.data?.users?.length > 0
      ? setUsers(response?.data.users)
      : setUsers([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        onChange={handleInputChange}
        className="border border-1 border-slate-600 mx-4 p-1 pl-2 w-1/4 rounded-lg box-content"
      />
    </div>
  );
}

function DisplayUsers({ users }) {
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <>
      {users?.length === 0 && <p className="p-4">No users found</p>}

      {users?.length > 0 && (
        <ul className="list-none flex flex-col p-4 gap-2">
          {users.map((user) => (
            <>
              <li key={user._id} className="flex flex-row justify-between">
                <p>{user.name}</p>
                <div className="flex flex-row gap-4">
                  {openTransferModal && selectedUserId === user._id && (
                    <p
                      onClick={() => {
                        setOpenTransferModal(false);
                        setSelectedUserId(null);
                      }}
                      className="px-3 border border-slate-400 rounded-full"
                    >
                      x
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setOpenTransferModal(true);
                    }}
                    className="text-slate-200 bg-slate-800 px-3 py-1 rounded-lg"
                  >
                    Transfer
                  </button>
                </div>
              </li>
              {openTransferModal && selectedUserId === user._id && (
                <SendMoney userId={selectedUserId} />
              )}
            </>
          ))}
        </ul>
      )}
    </>
  );
}

function SendMoney({ userId }) {
  const { balance, updateBalance } = useContext(BalanceContext);
  const [transferAmount, setTransferAmount] = useState(0);

  const handleSendMoney = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:3000/api/v1/account/transfer",
        {
          amount: transferAmount,
          user: userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.statusText == "OK") {
        updateBalance(balance - transferAmount);
      }
    } catch (error) {
      console.error("Dashboard component, error sending money", error);
    }

    setTransferAmount(0);
  };

  return (
    <div className="w-screen h-10 w-min-100 flex justify-center gap-2">
      <form onSubmit={handleSendMoney}>
        <input
          type="number"
          name="amount"
          value={transferAmount}
          min={1}
          className="w-60 border border-2 border-slate-300 rounded-lg pl-2 mr-2"
        />
        <button
          type="submit"
          className="text-slate-200 bg-slate-800 px-3 py-1 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
