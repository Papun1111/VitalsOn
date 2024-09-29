import React from 'react'
import Header from '../Components/Header/Header'
import SpecialityMenu from '../Components/SpecialityMenu/SpecialityMenu'
import TopDoctors from '../Components/TopDoctors/TopDoctors'
const Home = () => {
  return (
    <div>
      <Header></Header>
      <SpecialityMenu></SpecialityMenu>
      <TopDoctors></TopDoctors>
    </div>
  )
}

export default Home
