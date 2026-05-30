import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

function Main() {
  return (
    <section>
      <Header/>
      <Outlet/>
      <Footer/>
    </section>
  )
}

export default Main
