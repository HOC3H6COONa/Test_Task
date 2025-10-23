import UsersTablePage from "./components/pages/UsersTablePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserPage from "./components/pages/UserPage.tsx";
import NotFoundPage from "./components/common/NotFoundPage.tsx";
import {Notifications} from "@mantine/notifications";



function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UsersTablePage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Notifications/>
        </BrowserRouter>
    );
}

export default App;