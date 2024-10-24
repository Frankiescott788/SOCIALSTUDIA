import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
	Breadcrumbs,
	BreadcrumbItem,
	Image,
} from "@nextui-org/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../DATABASE/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../PROVIDERS/DataProvider";


const handleLogOut = () => {
	signOut(auth)
		.then(() => {
			Navigate("/signin");
		})
		.catch((error) => {
			console.error("Error signing out: ", error);
		});
};









export default function Navbar() {
	const navigate = useNavigate();

	const { pathname } = useLocation();

	const { currentUser, loading } = useAuth();
	const user = currentUser.personalInfo


	return (
		<div className="fixed bg-white border-b  top-0 left-0 right-0  p-4 w-full ms-[19rem] pe-[22rem]">

			<div className="flex justify-between ">
				<div className=" flex mt-3">
					{pathname === "/thuso" && (
						<Image src="thusologo.png" className="w-[8rem] " />
					)}
					{/* <span className="text-ti">Home</span>
					<span className="mx-1 text-lg">{">"}</span>
					<span className="">Dashboard</span> */}
				</div>
				<div>
					<Dropdown placement="bottom-start ">
						<DropdownTrigger>
							<User
								as="button"
								avatarProps={{
									isBordered: true,
									src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
								}}
								className="transition-transform"
								description={user.username}
								name={`${user.firstName} ${user.surname} (${currentUser?.activity.points})`}


							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-bold">Signed in as</p>
								<p className="font-bold"> {` ${user.username}  (${currentUser?.activity.points})`}</p>
							</DropdownItem>
							<DropdownItem onClick={() => navigate("/profile")} key="configurations">
								Profile
							</DropdownItem>
							<DropdownItem onClick={handleLogOut} key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>

				</div>
			</div>
		</div >
	)
}
