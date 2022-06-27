import "./styles.css";
import { useState } from "react";
import abi from "./ABI.json";
import { ethers } from "ethers";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [name, setname] = useState("");
  const [des, setdes] = useState("");
  const [tar, settar] = useState("0");
  const [time, settime] = useState("");

  const bal = async () => {
    const address = Author_Account();
    let provider = await ethers.getDefaultProvider("HTTP://127.0.0.1:7545");
    const balance = await provider.getBalance(address);

    console.log(ethers.utils.formatEther(balance));
    alert(ethers.utils.formatEther(balance));
  };

  const connect_wallet = async () => {
    const name = document.getElementById("name").value;
    const des = document.getElementById("des").value;
    const tar = document.getElementById("tar").value;
    const time = document.getElementById("time").value;

    console.log(name);
    console.log(des);
    console.log(tar);
    console.log(time);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      "0xEe3b6dD10445E2AE6E7Acc4E433De91083cea74F",
      abi,
      signer
    );

    let tx = await contract.setname(name, des, tar, time);
    console.log(tx);
  };

  const changed = () => {
    const title = document.getElementById("title").value;
    return title;
  };

  const newaddress = async () => {
    const Newaddress = document.getElementById("address").value;
    console.log(Newaddress);
    return Newaddress;
  };

  const Author_Account = async () => {
    if (!window.ethereum) console.log("install metamask");

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const author_account = document.getElementById("author_account").value;
    return author_account;
  };

  const startpayment = async () => {
    const time = document.getElementById("time").value;
    const address = Author_Account();

    const addr = Author_Account();
    var ether = changed();
    var new_address = newaddress();
    const tar = document.getElementById("tar").value;
    console.log(ether);
    if (!window.ethereum) console.log("install metamask");
    const provider = await new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    let contract = await new ethers.Contract(
      "0xEe3b6dD10445E2AE6E7Acc4E433De91083cea74F",
      abi,
      signer
    );
    console.log(contract);
    const balance = await provider.getBalance(addr);

    if (tar > ethers.utils.formatEther(balance)) {
      const tx = await signer.sendTransaction({
        from: new_address,
        to: addr,
        value: ethers.utils.parseUnits(ether)
      });
    }
    alert("target achieved");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <img
              className="card-img-top"
              src="https://i0.wp.com/racolblegal.com/wp-content/uploads/2017/07/crowdfunding.jpeg"
              alt="Card image cap"
              height="170px"
            />
            <div className="card-body">
              <h5 className="card-title">CROWD FUNDING</h5>{" "}
              <input
                type="text"
                className="form-control"
                placeholder="Enter Account"
                id="author_account"
                onChange={Author_Account}
                required
              />
              <span style={{ color: "red" }}>field Required</span>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Project Name
                </span>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(event) => setname(event.target.value)}
                  required
                />
                <span style={{ color: "red" }}>field Required</span>
              </li>
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Description
                </span>{" "}
                <input
                  type="text"
                  id="des"
                  className="form-control"
                  onChange={(event) => setdes(event.target.value)}
                  required
                />
                <span style={{ color: "red" }}>field Required{des}</span>
              </li>
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Target
                </span>{" "}
                <input
                  id="tar"
                  type="number"
                  className="form-control"
                  onChange={(event) => settar(event.target.value)}
                  required
                />
                <span style={{ color: "red" }}>field Required</span>{" "}
              </li>
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Deadline
                </span>{" "}
                <input
                  id="time"
                  type="date"
                  className="form-control"
                  placeholder="In Blocktime"
                  onChange={(event) => settime(event.target.value)}
                  required
                />
                <span style={{ color: "red" }}>field Required</span>
              </li>
              <li className="list-group-item">
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={connect_wallet}
                >
                  Add Project
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <img
              className="card-img-top"
              src="https://knowledge.skema.edu/wp-content/uploads/2020/10/shutterstock_1356273047-1536x1024.jpg"
              alt="Card image cap"
              height="170px"
            />
            <div className="card-body">
              <h5 className="card-title">GIVE FUNDING</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Enter Address
                </span>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  onChange={newaddress}
                  required
                />
              </li>
              <li className="list-group-item">
                <span className="input-group-text" id="">
                  Enter funds
                </span>{" "}
                <input
                  type="number"
                  className="form-control"
                  id="title"
                  onChange={changed}
                  required
                />
              </li>

              <li className="list-group-item">
                <button
                  type="button"
                  name="ether"
                  className="btn btn-dark"
                  onClick={startpayment}
                >
                  Fund Ethers
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <img
              className="card-img-top"
              src="https://www.paldesk.com/wp-content/uploads/2019/03/business-crowdfunding.png"
              alt="Card image cap"
              height="170px"
            />
            <div className="card-body">
              <h5 className="card-title">TOTAL FUNDING</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <button type="button" className="btn btn-dark" onClick={bal}>
                  Results Here
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
