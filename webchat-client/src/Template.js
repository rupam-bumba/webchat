import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home.js";
import Chats from "./chats/Chats";
import Dev from "./chats/Dev";

export default function Template() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="chats/:rec/:usr" element={<Chats />} />
        <Route path="dev" element={<Dev />} />
        
      </Routes>
    </BrowserRouter>
  );
}
