import React from "react";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Components/Splash";
import FrontPage from "./Components/Frontpage";
import Welcome from "./Components/Welcome";
import Chat from "./Components/Chat";
import Boarding from "./Components/Boarding";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Path from "./Components/Path";
import SignUpPro from "./Components/SignUpPro";
import OTP from "./Components/OTP";
import Location from "./Components/Location"
import EnterLocation from "./Components/EnterLocation";
import ConfirmLocation from "./Components/ConfirmLocation";
import LocationSet from "./Components/LocationSet";
import Notification from "./Components/Notification";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import SeekRequest from "./Components/SeekRequest";
import Message from "./Components/Messages";
import Unread from "./Components/Unread";
import Archived from "./Components/Archive";
import RealProfile from "./Components/RealProfile";
import Edit from "./Components/Edit";
import Settings from "./Components/Settings";
import NotificSet from "./Components/NotificSet";
import ViewProfile from "./Components/ViewProfile";
import ChatSpace from "./Components/ChatSpace";
import ConfirmBooking from "./Components/ConfirmBooking";
import BookKeeping from "./Components/BookKeeping";
import Feedback from "./Components/Feedback";
import Search from "./Components/Search";
import Categories from "./Components/Categories";
import Provider from "./Components/Provider";
import NotifA from "./Components/NotifA";
import Theme from "./Components/Theme";
import ContactSupport from "./Components/ContactSupport";
import Signingin from "./Components/SigningIn";
import HomeNotification from "./Components/HomeNotification";
import PersonalInfo from "./Components/PersonalInfo";
import Google from "./Components/Google";
import GoogleSign from "./Components/GoogleSign";
import Apple from "./Components/Apple";
import DashboardProv from "./Components/DashboardProv";
import Notifprov from "./Components/Notifprov";
import SettingsProv from "./Components/SettingsProv";
import ServiceReq from "./Components/ServiceReq";
import RespondReq from "./Components/RespondReq";
import EarningsPayouts from "./Components/EarningsPayouts";
import WithdrawProvider from "./Components/WithdrawProvider";
import ResetPassword from "./Components/ResetPassword";
import EnterCode from "./Components/EnterCode";
import CreateNewPassword from "./Components/CreateNewPassword";
import Loading from "./Components/Loading";


 function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/boarding" element={<Boarding />} />
        <Route path="/path" element={<Path />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signuppro" element={<SignUpPro />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/location" element={<Location />} />
        <Route path="/enter-location" element={<EnterLocation />} />
        <Route path="/confirm-location" element={<ConfirmLocation />} />
        <Route path="/location-set" element={<LocationSet />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/seekrequest" element={<SeekRequest />} />
        <Route path="/message" element={<Message />} />
        <Route path="/unread" element={<Unread />} />
        <Route path="/archive" element={<Archived />} />
        <Route path="/realprofile" element={<RealProfile />} />
        <Route path="/editprofile" element={<Edit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notificset" element={<NotificSet />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="confirmbooking" element={<ConfirmBooking />} />
        <Route path="book-keeping" element={<BookKeeping />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="chatspace" element={<ChatSpace />} />
        <Route path="search" element={<Search />} />
        <Route path="category" element={<Categories />} />
        <Route path="provider" element={<Provider />} />
        <Route path="notifa" element={<NotifA />} />
        <Route path="theme" element={<Theme />} />
        <Route path="contactsupport" element={<ContactSupport />} />
        <Route path="signingin" element={<Signingin />} />
        <Route path="homenotification" element={<HomeNotification />} />
        <Route path="personalinfo" element={<PersonalInfo />} />
        <Route path="google" element={<Google />} />
        <Route path="googlesign" element={<GoogleSign />} />
        <Route path="googlesign" element={<GoogleSign />} />
        <Route path="apple" element={<Apple />} />
        <Route path="dashboardprov" element={<DashboardProv />} />
        <Route path="notifprov" element={<Notifprov />} />
        <Route path="settingsprov" element={<SettingsProv />} />
        <Route path="servicereq" element={<ServiceReq />} />
        <Route path="respondreq" element={<RespondReq />} />
        <Route path="earnings" element={<EarningsPayouts />} />
        <Route path="withdraw" element={<WithdrawProvider />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="entercode" element={<EnterCode />} />
        <Route path="create-password" element={<CreateNewPassword />} />
        <Route path="loading" element={<Loading />} />
      </Routes>
        
    </BrowserRouter>
  );
} 

export default App;


