import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import DownloadIcon from '@material-ui/icons/GetApp';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import { Button, Card, Grid, CardHeader, CardContent, Typography, DialogContentText, Dialog, DialogContent, Container, CardMedia, Modal } from '@material-ui/core';
import { getCars } from '../redux/action/homeAction'
import usePagination from '../utils/Pagination'

interface Props { }

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    search: {
        position: 'relative',
        marginLeft: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightgray'
    },
    inputRoot: {
        color: 'inherit',
        borderWidth: '2px',
        border: "solid",
        borderColor: "#a89280",
        borderRadius: "8px"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        color: 'gray'
    },
    white: {
        color: "white"
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "10px"
    },
    cardMedia: {
        paddingTop: '40%', // 16:9
    },
    logoMedia: {
        width: 85,
        height: 40,
    },
    cardContent: {
        flexGrow: 1,
    },
    selected: {
        color: '#ffffff',
        background: "green"
    },
    ul: {
        "& .Mui-selected": {
            background: "#aa6e3e",
            color: "white"
        }
    }
}))

const Home: React.FC<Props> = (props) => {
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.homeScreenReducer.carsList)
    const PER_PAGE = 15;
    const count = Math.ceil(data?.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    const getCarsReq = useCallback(
        async () => {
            dispatch(getCars())
        },
        [dispatch],
    )

    useEffect(() => {
        initialCall()
    }, [])

    const initialCall = async () => {
        await getCarsReq()
    }

    const classes = useStyles()

    const modalOpen = (title: string) => {
        setModalTitle(title);
        setOpenModal(true);
    }

    const renderModal = () => {
        var isCreate = modalTitle.includes('Create')
        return (
            <div>
                <Dialog open={openModal} maxWidth={"xs"} fullWidth={true} onClose={() => setOpenModal(false)}>
                    <DialogContent className="p10">
                        <div className="set-sb">
                            <DialogContentText gutterBottom> {isCreate ? modalTitle : "Export in "+ modalTitle}</DialogContentText>
                            <ClearIcon className="cursor-pointer" onClick={()=>setOpenModal(false)}/>
                        </div>
                        <div className="set-c p20"><Button className="set-c bg-brown white">{isCreate ? "Add New" : "Export Now"}</Button></div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <Grid id="top-row" container spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                <Grid className="set-s" xs={5}>
                    <span className="p10 pl-25 fw-600 text-muted">All Sales Transactions</span>
                </Grid>
                <Grid className="cursor-pointer" item xs={2}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase className="cursor-pointer"
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid className="cursor-pointer" item 
                style={{ width: "14rem" }}>
                    <Card className="set-sb p7 bg-brown" style={{ width: "12rem" }}
                    >
                        <Typography className={classes.white}>
                            Filter by:
                        </Typography>
                        <ExpandMoreIcon className={classes.white} />
                    </Card>
                </Grid>
                <Grid className="cursor-pointer" item>
                    <Card className="set-sa p7 bg-brown" 
                    style={{ width: "12rem" }}
                     onClick={() => modalOpen('Excel')}>
                        <DownloadIcon className={classes.white} />
                        <Typography className={classes.white}>
                            Export in Excel
                        </Typography>
                    </Card>
                </Grid>
                <Grid className="cursor-pointer" item>
                    <Card className="set-sa p7 bg-brown" 
                    style={{ width: "11rem" }} 
                    onClick={() => modalOpen('PDF')}>
                        <DownloadIcon className={classes.white} />
                        <Typography className={classes.white}>
                            Export in PDF
                        </Typography>
                    </Card>
                </Grid>
                <Grid className="cursor-pointer" item>
                    <Card className="set-sa p7 bg-brown"
                     style={{ width: "5rem" }}
                      onClick={() => modalOpen('Create Here')}>
                        <AddIcon className={classes.white} />
                        <Typography className={classes.white}>
                            Create
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    const renderItemCard = (item: any) => {
        return (
            <Grid style={{ borderColor: "white", border: "unset" }} item key={data.indexOf(item)} xs={12} sm={6} md={4}>
                <Card style={{ border: "none", boxShadow: "none" }} className="bg-light-brown cursor-pointer">
                    <CardMedia
                        className={classes.cardMedia}
                        image={item.image}
                        title="Image title"
                    />
                    <CardContent className={"bg-light-brown"}>
                        <Grid id="top-row" container spacing={2}
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start">
                            <Grid item className="set-f">
                                <div style={{ flexDirection: "column", display: "flex" }}>
                                    <span className="fs-15 black">{item.name}</span>
                                    <span className="fs-13">{item.model}</span>
                                </div>
                                <div className="pl-15">
                                    <Card className="bg-brown">
                                        <span className="white fs-10 p5 set-c">For Handover</span>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item className="">
                                <CardMedia
                                    className={classes.logoMedia}
                                    image={item.brandLogo}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div style={{ flexDirection: "column", display: "flex" }}>
                                <div className="set-f text-muted fs-13 pt-5"><span>{item.buyDate}</span><div className="plt-2">|</div><span>{item.kmDriven}</span></div>
                                <span className="text-muted fs-10 pt-3">Created On: {item.createdOn}</span>
                            </div>
                        </Grid>
                    </CardContent>
                    <div className="bg-brown divider "></div>
                    <CardContent className="border-t bg-light-brown">
                        <Grid item className="set-sb">
                            <div style={{ flexDirection: "column", display: "flex" }}>
                                <span className="main-color fs-13">Bidding Session Details</span>
                                <span className="fs-13 pt-5">Awarded Dealor: Agnes Lam</span>
                            </div>
                            <div>
                                <ExpandMoreIcon className="main-color p5" style={{ transform: "rotate(270deg)" }} />
                            </div>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        _DATA.jump(value);
    };

    const finalList = searchText.length > 0 ? data.filter((item: any) => {
        console.log('item --->', item);
        return (item?.name.toLowerCase().includes(searchText) || item?.model.toLowerCase().includes(searchText))
    }) : _DATA?.currentData();

    return (
        <div className={classes.root}>
            {renderModal()}
            {renderHeader()}
            {/* <Pagination className="set-c pt-6" page={page} size="large"  count={10} color="primary" /> */}
            <Container className={classes.cardGrid} maxWidth="xl">
                <Grid container spacing={4} justify="space-between"
                    alignItems="center">
                    {finalList?.map((card: any) => (
                        renderItemCard(card)
                    ))}
                </Grid>
            </Container>
            <Pagination classes={{ ul: classes.ul }} className="set-c" page={page} size="large" count={count} onChange={handleChange} />
        </div>
    )
}
export default Home
