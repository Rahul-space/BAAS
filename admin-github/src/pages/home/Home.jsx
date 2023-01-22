import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = (user) => {
  return (
    <div className="home">
      <Sidebar user={user}/>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="balance" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="User Registration Chart" aspect={3 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">New Users Registered</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
