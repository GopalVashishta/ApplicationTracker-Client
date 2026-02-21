import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

const UserLayout = ({ children }) => {
    return (
        <>
            <UserHeader />
            {children}
            <UserFooter />
        </>
    );
};

export default UserLayout;