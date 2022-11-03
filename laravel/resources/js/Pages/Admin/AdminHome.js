import * as React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "@inertiajs/inertia-react";

export default function AdminHome() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{maxWidth: 250}}>
                    <Link href={route("admin_users")}>
                        <div>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
                                    alt="Usuarios"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{textDecoration: 'none'}}>
                                        Usuarios
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'none'}}>
                                        Gestión de Usuarios
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </div>
                    </Link>
                </Card>
            </Grid>
        </Grid>
    );
}
