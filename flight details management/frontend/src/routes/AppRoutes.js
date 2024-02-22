import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import Package from '../pages/admin/travelpackage/TravelPackage'
import Client from '../pages/admin/client/client'
import Ride from '../pages/admin/ride/ride'
import SignUp from "../pages/client/signup/SignUp";
import ClientLayout from "../layout/clientLayout";
import AdminLayout from "../layout/adminLayout";
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import ClientHeader from "../components/client/common/header/ClientHeader";
import HomePage from "../pages/client/home/homePage";
import RidePage from "../pages/client/ride/ridePage";
import Service from "../pages/admin/serviceMangement/service";
import ServiceEdit from "../pages/admin/serviceMangement/editService";
import Test from "../pages/admin/serviceMangement/edittest";
import Testt from "../pages/admin/serviceMangement/ptest";
import UpdateService from "../pages/admin/serviceMangement/updateservice";
import Tablea from "../pages/admin/serviceMangement/table";
import Appoinment from "../pages/admin/serviceMangement/makeappoinment";
import Appoinmentmgmnt from "../pages/admin/serviceMangement/appomngmt";
import Reqservice from "../pages/admin/serviceMangement/reqservice";
import Delivery from "../pages/admin/deliveryManagement/addDelivery";
import EditDelivery from "../pages/admin/deliveryManagement/editDelivery";
import Finance from "../pages/admin/financeManagement/addFinance";
import Financemngmnt from "../pages/admin/financeManagement/editFinance";
import FinanceChart from "../pages/admin/financeManagement/bar";
import Flight from "../pages/admin/FlightManagemnt/addFlight";
import FlightMngmnt from "../pages/admin/FlightManagemnt/editFlight";



const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" render={(props) => <SignUp/>}/>;
                    <Route path='/client/:path?' exact>
                        <div style={{"height": "auto"}}>
                            <ClientHeader/>
                            <ClientLayout>
                                <main>
                                    <Switch>
                                        <Route path="/client" render={(props) => <HomePage/>} exact/>;
                                        <Route path="/client/ride" render={(props) => <RidePage/>} />;
                                    </Switch>
                                </main>
                            </ClientLayout>
                        </div>
                    </Route>

                    <Route path='/admin/:path?' exact>
                        <AdminLayout class="wrapper">
                            <Header/>
                            <Sidebar/>
                            <Switch>
                                <Route path="/admin" render={(props) => <Dashboard/>} exact/>;
                                <Route path="/admin/package" render={(props) => <Package/>}/>;
                                <Route path="/admin/client" render={(props) => <Client/>}/>;
                                <Route path="/admin/ride" render={(props) => <Ride/>}/>;
                                <Route path="/admin/service" render={(props) => <Service/>}/>;
                                <Route path="/admin/sedit" render={(props) => <ServiceEdit/>}/>;
                                <Route path="/admin/test" render={(props) => <Test/>}/>;
                                <Route path="/admin/t" render={(props) => <Testt/>}/>;
                                <Route path="/admin/update" render={(props) => <UpdateService/>}/>;
                                <Route path="/admin/table" render={(props) => <Tablea/>}/>;
                                <Route path="/admin/appo" render={(props) => <Appoinment/>}/>;
                                <Route path="/admin/appomgmt" render={(props) => <Appoinmentmgmnt/>}/>;
                                <Route path="/admin/req" render={(props) => <Reqservice/>}/>;

                                {/* Delivery management */}
                                <Route path="/admin/delivery" render={(props) => <Delivery/>}/>;
                                <Route path="/admin/editd" render={(props) => <EditDelivery/>}/>;


                                {/* finance mangement */}
                                <Route path="/admin/finance" render={(props) => <Finance/>}/>;
                                <Route path="/admin/financeedit" render={(props) => <Financemngmnt/>}/>;
                                <Route path="/admin/chart" render={(props) => <FinanceChart/>}/>;

                                {/* Flight managemnt */}
                                <Route path="/admin/flight" render={(props) => <Flight/>}/>;
                                <Route path="/admin/editflight" render={(props) => <FlightMngmnt/>}/>;

                                
                            </Switch>
                        </AdminLayout>
                    </Route>


                </Switch>
            </Router>
        </div>
    );
};
export default AppRoutes;
