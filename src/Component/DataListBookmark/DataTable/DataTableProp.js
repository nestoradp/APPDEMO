import { useState } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Switch,
  Container,
  FormControl,
  Button,
  Modal,
  Box,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useStyle } from "../ListarStyle";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Delete, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../../Redux/Action/ActionError";
import { DeleteApiBookmark } from "../../../Axios/BookmarksAPI";
import { useHistory } from "react-router";
import { EditBookmark } from "../../EditarBookmark/EditBookmark";
import { AuthCloseSesion } from "../../../Redux/Action/ActionAuth";

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "ID" },
  { id: "abstract", numeric: false, disablePadding: false, label: "Abstract" },
  { id: "path", numeric: false, disablePadding: false, label: "Path" },
  { id: "time", numeric: false, disablePadding: false, label: "Time" },
  { id: "author", numeric: false, disablePadding: false, label: "Author" },
  { id: "resource", numeric: false, disablePadding: false, label: "Resource" },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "normal" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const classes = useStyle();
  const { HandleConfirmDeleteBookMark } = props;

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Marcadores
      </Typography>
    </Toolbar>
  );
};

function DataTableProp({ data, setdata }) {
  const rows = [data.map((r) => ({ id: r.id, path: r.path }))];
  const classes = useStyle();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [OpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [OpenModalEdit, setOpenModalEdit] = useState(false);
  const [SelectId, setSelectId] = useState("");
  const [BookmarkEdit, setBookmarkEdit] = useState(null);
  const { tokens } = useSelector((state) => state.UserLogin);
  const { loading } = useSelector((state) => state.UIError);
  const dispatch = useDispatch();


  // Funciones del DataTable
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // Funciones del CRUD
  const HandleConfirmDeleteBookMark = (id) => {
    setOpenDeleteConfirm(true);
    setSelectId(id);
  };
// Funcion para Eliminar un Bookmark y consultar el servicio del Api
  const DeleteBookmark = () => {
    const token = tokens["access-token"];
    dispatch(removeError());
    dispatch(startLoading());
    DeleteApiBookmark(SelectId, token)
      .then((data) => {
        setSelectId("");
        setdata(data.filter((d) => d.id !== SelectId));
        dispatch(finishLoading());
      })
      .catch((error) => {
        const status = error.request.status;
        dispatch(setError("", status));
        if (status === 403) {
          dispatch(AuthCloseSesion());
        }
        dispatch(finishLoading());
        setdata(data.filter((d) => d.id !== SelectId));
        setSelectId("");
      });

    setOpenDeleteConfirm(false);
  };
// Abriri el Modal de editar
  const HandleModalEditBookMark = (bookmark) => {
    setOpenModalEdit(true);
    setBookmarkEdit(bookmark);
  };

  // Permite Abrir el Modal de Confirmacion del eliminar

  const body = (
    <Container className={classes.content + " " + classes.positionCard}>
      <form>
        <FormControl className={classes.select}>
          <Alert severity="error">
            <AlertTitle>
              Esta seguro que desea elminar el marcador seleccionados con id:{" "}
              {SelectId}
            </AlertTitle>
          </Alert>
          <Box my={2} display="flex" justifyContent="space-around">
            <Button
              className={classes.ButtonEliminar}
              variant="contained"
              color="primary"
              onClick={() => setOpenDeleteConfirm(false)}
            >
              Cancelar
            </Button>

            <Button
              className={classes.ButtonEliminar}
              variant="contained"
              color="primary"
              onClick={DeleteBookmark}
            >
              Eliminar
            </Button>
          </Box>
        </FormControl>
      </form>
    </Container>
  );

  return (
    <div className={classes.rootPrincipal}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          HandleConfirmDeleteBookMark={HandleConfirmDeleteBookMark}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row" padding="normal">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.abstract}</TableCell>
                      <TableCell align="left">{row.path}</TableCell>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.author.name}</TableCell>
                      <TableCell align="left">{row.resource.id}</TableCell>
                      <TableCell>
                        <Edit
                          className={classes.icons}
                          onClick={() => HandleModalEditBookMark(row)}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Delete
                          className={classes.icons}
                          onClick={() => HandleConfirmDeleteBookMark(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Modal
        open={OpenDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
      >
        {body}
      </Modal>

      <Modal
        className={classes.edit_modal}
        open={OpenModalEdit}
        onClose={() => setOpenModalEdit(false)}
      >
        <EditBookmark
          setOpenModalEdit={setOpenModalEdit}
          BookmarkEdit={BookmarkEdit}
          data={data}
          setdata={setdata}
        />
      </Modal>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress size={100} color="inherit" />
      </Backdrop>
    </div>
  );
}

export default DataTableProp;
