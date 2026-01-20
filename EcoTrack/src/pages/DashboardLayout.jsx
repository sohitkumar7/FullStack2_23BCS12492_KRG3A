import {Link,Outlet} from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div style={{padding : "1rem"}}>
      <h3>
        DashBoard
      </h3>

    <nav>
      <Link to ="summary" > summary
      </Link> | {" "}
      <Link to= "analytics" >Anayists</Link>
    </nav>
    <hr />
    <Outlet/>
    </div>
  )
}

export default DashboardLayout;