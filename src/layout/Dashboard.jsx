import { useState } from "react"
import { NavLink, Outlet, Link as RouterLink } from "react-router-dom"
import {
	Avatar, Box, Chip, Divider, Drawer, IconButton, List, ListItemButton,
	ListItemIcon, ListItemText, Stack, Tooltip, Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { MdOutlineDashboard, MdOutlineWorkspacePremium, MdConnectWithoutContact, MdOutlinePageview, MdEditNote, MdFavoriteBorder } from "react-icons/md"
import { FaUsersGear } from "react-icons/fa6"
import { GiRingBox } from "react-icons/gi"
import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
import Logo from "../shared/Logo"
import useAuth from "../hooks/useAuth"
import useUser from "../hooks/useUser"
import useAdmin from "../hooks/useAdmin"
import { brand } from "../theme/theme"

const drawerWidth = 280

const adminNav = [
	{ label: "Dashboard", icon: <MdOutlineDashboard />, path: "/dashboard/admin-dashboard" },
	{ label: "Manage Users", icon: <FaUsersGear />, path: "/dashboard/manage-users" },
	{ label: "Premium Requests", icon: <MdOutlineWorkspacePremium />, path: "/dashboard/premium-request" },
	{ label: "Contact Requests", icon: <MdConnectWithoutContact />, path: "/dashboard/contact-request" },
]

const userNav = [
	{ label: "Dashboard", icon: <MdOutlineDashboard />, path: "/dashboard/user-dashboard" },
	{ label: "Edit Bio Data", icon: <MdEditNote />, path: "/dashboard/edit-bio-data" },
	{ label: "View Bio Data", icon: <MdOutlinePageview />, path: "/dashboard/view-bio-data" },
	{ label: "My Contact Requests", icon: <MdConnectWithoutContact />, path: "/dashboard/my-contact-request" },
	{ label: "My Favourites", icon: <MdFavoriteBorder />, path: "/dashboard/favorites-bio-data" },
	{ label: "Got Married", icon: <GiRingBox />, path: "/dashboard/got-married" },
]

const Dashboard = () => {
	const { user, logout } = useAuth()
	const [isAdmin] = useAdmin()
	const [userInfo] = useUser()
	const [mobileOpen, setMobileOpen] = useState(false)

	const avatarSrc = userInfo?.photo || user?.photoURL || undefined
	const navItems = isAdmin ? adminNav : userNav

	const handleLogout = () => {
		logout().catch((error) => console.error(error))
	}

	const drawerContent = (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: "22px 18px" }}>
			<Box sx={{ px: "8px" }}>
				<Logo light />
			</Box>

			{/* mini profile */}
			<Stack direction="row" spacing={1.5} alignItems="center" sx={{
				mt: "28px", p: "12px 14px", borderRadius: "14px",
				bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
			}}>
				<Avatar
					src={avatarSrc}
					alt={user?.displayName || "User"}
					imgProps={{ referrerPolicy: "no-referrer" }}
					sx={{ bgcolor: brand.secondary, width: 44, height: 44, fontWeight: 600 }}
				>
					{user?.displayName?.charAt(0)?.toUpperCase()}
				</Avatar>
				<Box sx={{ minWidth: 0 }}>
					<Typography noWrap sx={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>
						{user?.displayName || "Member"}
					</Typography>
					<Chip
						label={isAdmin ? "Admin" : userInfo?.premium ? "Premium Member" : "Member"}
						size="small"
						sx={{
							height: "20px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.5px",
							bgcolor: isAdmin ? brand.gold : userInfo?.premium ? brand.gold : "rgba(255,255,255,0.12)",
							color: isAdmin || userInfo?.premium ? "#3a2e10" : "rgba(255,255,255,0.8)",
						}}
					/>
				</Box>
			</Stack>

			{/* navigation */}
			<Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", mt: "28px", mb: "6px", px: "10px" }}>
				MENU
			</Typography>
			<List sx={{ p: 0 }}>
				{navItems.map((item) => (
					<ListItemButton
						key={item.label}
						component={NavLink}
						to={item.path}
						onClick={() => setMobileOpen(false)}
						sx={{
							borderRadius: "10px", mb: "4px", px: "14px", py: "10px",
							color: "rgba(255,255,255,0.65)",
							"&:hover": { bgcolor: "rgba(255,255,255,0.07)" },
							"&.active": {
								bgcolor: brand.secondary, color: "#fff",
								boxShadow: "0px 8px 20px 0px rgba(235,3,89,0.35)",
							},
						}}
					>
						<ListItemIcon sx={{ color: "inherit", minWidth: "38px", fontSize: "20px" }}>
							{item.icon}
						</ListItemIcon>
						<ListItemText primaryTypographyProps={{ fontSize: "14px", fontWeight: 500, fontFamily: "Poppins" }}>
							{item.label}
						</ListItemText>
					</ListItemButton>
				))}
			</List>

			{/* bottom actions */}
			<Box sx={{ mt: "auto" }}>
				<Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: "10px" }} />
				<ListItemButton
					component={RouterLink}
					to="/"
					sx={{ borderRadius: "10px", px: "14px", py: "10px", color: "rgba(255,255,255,0.65)", "&:hover": { bgcolor: "rgba(255,255,255,0.07)" } }}
				>
					<ListItemIcon sx={{ color: "inherit", minWidth: "38px", fontSize: "19px" }}><IoHomeOutline /></ListItemIcon>
					<ListItemText primaryTypographyProps={{ fontSize: "14px", fontWeight: 500, fontFamily: "Poppins" }}>Back to Home</ListItemText>
				</ListItemButton>
				<ListItemButton
					onClick={handleLogout}
					sx={{ borderRadius: "10px", px: "14px", py: "10px", color: "#ff7b9c", "&:hover": { bgcolor: "rgba(235,3,89,0.12)" } }}
				>
					<ListItemIcon sx={{ color: "inherit", minWidth: "38px", fontSize: "19px" }}><IoExitOutline /></ListItemIcon>
					<ListItemText primaryTypographyProps={{ fontSize: "14px", fontWeight: 500, fontFamily: "Poppins" }}>Logout</ListItemText>
				</ListItemButton>
			</Box>
		</Box>
	)

	return (
		<Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f4ec" }}>
			{/* sidebar */}
			<Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": { width: drawerWidth, bgcolor: brand.dark, borderRight: "none" },
					}}
				>
					{drawerContent}
				</Drawer>
				<Drawer
					variant="permanent"
					open
					sx={{
						display: { xs: "none", md: "block" },
						"& .MuiDrawer-paper": { width: drawerWidth, bgcolor: brand.dark, borderRight: "none" },
					}}
				>
					{drawerContent}
				</Drawer>
			</Box>

			{/* main area — minWidth 0 lets wide tables scroll inside their
			    containers instead of stretching the page horizontally */}
			<Box component="main" sx={{ flexGrow: 1, minWidth: 0, width: { md: `calc(100% - ${drawerWidth}px)` }, display: "flex", flexDirection: "column" }}>
				{/* topbar */}
				<Box sx={{
					position: "sticky", top: 0, zIndex: 30,
					bgcolor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
					borderBottom: "1px solid #ece5d3",
					px: { xs: "16px", md: "32px" }, py: "12px",
					display: "flex", alignItems: "center", justifyContent: "space-between",
				}}>
					<Stack direction="row" spacing={1.5} alignItems="center">
						<IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" } }}>
							<MenuIcon />
						</IconButton>
						<Typography sx={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: "19px", color: brand.primary }}>
							{isAdmin ? "Admin Panel" : "My Dashboard"}
						</Typography>
					</Stack>
					<Tooltip title={user?.email || ""}>
						<Avatar
							src={avatarSrc}
							alt={user?.displayName || "User"}
							imgProps={{ referrerPolicy: "no-referrer" }}
							sx={{ bgcolor: brand.secondary, width: 38, height: 38, fontWeight: 600, fontSize: "16px" }}
						>
							{user?.displayName?.charAt(0)?.toUpperCase()}
						</Avatar>
					</Tooltip>
				</Box>

				{/* page content */}
				<Box sx={{ p: { xs: "18px", md: "32px" }, flexGrow: 1 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	)
}

export default Dashboard
