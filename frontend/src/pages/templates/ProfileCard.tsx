import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    CardMedia,
    List,
    ListItem,
    TextField,
    ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ProfileProps {
    id: string;
    name: string;
    role: string;
    contactNumber: string;
    email: string;
    username: string;
    password: string;
    result?: any;
    pageContext: "profile" | "useracc";
}

const ProfileCard: React.FC<ProfileProps> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({ ...props });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const handleChange =
        (prop: keyof typeof profile) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setProfile({ ...profile, [prop]: event.target.value });
        };

    const handleCancel = () => {
        setProfile({ ...props }); // Revert to original props
        setEditMode(false);
    };

    const handleSave = async () => {
        // In a real application, you might also want to send these updates back to a server here
        try {
            // Send update request to API
            const tokens = JSON.parse(
                localStorage.getItem("authTokens") || "{}"
            );
            const token = tokens.access;
            const response = await fetch("baseUrl/updateDetails/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
        setEditMode(false);
    };

    const handleBack = () => {
        // Navigate back to the previous page
        window.history.back();
    };

    const handleDelete = async () => {
        try {
            // Send delete request to API
            const response = await fetch(`your-api-url/${profile.id}`, {
                method: "DELETE",
                // Additional headers or credentials if needed
            });

            if (response.ok) {
                console.log("Profile deleted successfully");
                // Handle any further UI updates or navigation
            } else {
                console.error("Failed to delete profile");
                // Handle error scenarios
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            // Handle network errors or other exceptions
        } finally {
            // Close delete confirmation dialog
            setDeleteConfirmationOpen(false);
        }
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                boxShadow: 3,
                borderRadius: 2,
                m: 2,
                fontFamily: "Open Sans",
            }}
        >
            <CardMedia
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 140,
                }}
            >
                <AccountCircleIcon sx={{ fontSize: 100, mt: 2 }} />
            </CardMedia>
            <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
                    Doctor Profile
                </Typography> */}
                <List>
                    {editMode ? (
                        <>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="ID"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.id}
                                    onChange={handleChange("id")}
                                    disabled
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.name}
                                    onChange={handleChange("name")}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Role"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.role}
                                    onChange={handleChange("role")}
                                    disabled
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.email}
                                    onChange={handleChange("email")}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Contact Number"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.contactNumber}
                                    onChange={handleChange("contactNumber")}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.username}
                                    onChange={handleChange("username")}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    autoCapitalize="none"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    value={profile.password}
                                    onChange={handleChange("password")}
                                    disabled
                                />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary="ID:"
                                    secondary={profile.id}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Name:"
                                    secondary={profile.name}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Role:"
                                    secondary={profile.role}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Contact Number:"
                                    secondary={profile.contactNumber}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Email:"
                                    secondary={profile.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Username:"
                                    secondary={profile.username}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Password:"
                                    secondary={profile.password}
                                />
                            </ListItem>
                        </>
                    )}
                </List>
                {editMode ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                ) : (
                    <>
                        {props.pageContext === "useracc" && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "20px",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 1, mx: "auto", display: "block" }}
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                        {props.pageContext === "profile" && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1, mx: "auto", display: "block" }}
                                onClick={() => setEditMode(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileCard;

//old below

// import React from 'react';
// import { Card, CardContent, Typography, Button, CardMedia, List, ListItem, ListItemText } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// interface ProfileProps {
//     doctorId: string;
//     name: string;
//     contactNumber: string;
//     email: string;
// }

// const ProfileCard: React.FC<ProfileProps> = ({ doctorId, name, contactNumber, email }) => {
//     return (
//         <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, m: 2 }}>
//             <CardMedia
//                 sx={{
//                     display: 'flex', // Enable flexbox
//                     justifyContent: 'center', // Center horizontally
//                     alignItems: 'center', // Center vertically (optional if you want it exactly in the middle of the space)
//                     height: 140 // Set a specific height for the CardMedia container
//                 }}
//             >
//                 <AccountCircleIcon sx={{ fontSize: 100, mt: 2 }} />
//             </CardMedia>
//             <CardContent>
//                 {/* <Typography gutterBottom variant="h5" component="div">
//                     Doctor Profile
//                 </Typography> */}
//                 <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
//                     Doctor Profile
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <ListItemText primary="Doctor ID:" secondary={doctorId} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Doctor Name:" secondary={name} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Contact Number:" secondary={contactNumber} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="Email:" secondary={email} />
//                     </ListItem>
//                 </List>
//                 <Button variant="contained" color="primary" sx={{ mt: 1 }}>
//                     Edit
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProfileCard;
