/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet-async";
import "../App.css";

const saveTasks = (date, tasks) => {
  localStorage.setItem(date, JSON.stringify(tasks));
};

const loadTasks = (date) => {
  const tasks = localStorage.getItem(date);
  return tasks ? JSON.parse(tasks) : [];
};

function TodoPage({ selectedDate }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCongratsDialog, setOpenCongratsDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    // Charger les tâches associées à la date sélectionnée
    const tasksForDate = loadTasks(selectedDate);
    setTodos(tasksForDate);
  }, [selectedDate]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodos = [...todos, { text: inputValue, completed: false }];
      setTodos(newTodos);
      saveTasks(selectedDate, newTodos); 
      setInputValue("");
      setOpenSnackbar(true);
    }
  };

  const handleClickOpen = (index) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const newTodos = todos.filter((_, i) => i !== deleteIndex);
      setTodos(newTodos);
      saveTasks(selectedDate, newTodos);
      setDeleteIndex(null);
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const toggleCompletion = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTasks(selectedDate, newTodos);

    if (newTodos.every((todo) => todo.completed)) {
      setOpenCongratsDialog(true);
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  const handleCloseCongratsDialog = () => {
    setOpenCongratsDialog(false);
  };

  return (
    <div>
      <Helmet>
        <title>Liste des tâches - Gérer vos tâches facilement</title>
        <meta
          name="description"
          content="Ajoutez, complétez et supprimez des tâches avec notre gestionnaire de tâches simple et intuitif."
        />
      </Helmet>
      <Container maxWidth="sm" className="container">
        <Typography variant="h5" color="black" align="center" gutterBottom>
          Todo List - {selectedDate}
        </Typography>

        <Typography variant="h6" color="black" align="center" gutterBottom>
          Tâches complètes : {completedCount}/{totalTodos}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Ajouter une tâche..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Ajouter
        </Button>

        <List>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    onClick={() => toggleCompletion(index)}
                  >
                    <CheckIcon color={todo.completed ? "primary" : "action"} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleClickOpen(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                color="black"
                primary={todo.text}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "grey" : "black",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tâche ajoutée avec succès !
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette tâche ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCongratsDialog}
        onClose={handleCloseCongratsDialog}
        PaperProps={{
          style: {
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle>Félicitations !</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous avez terminé toutes vos tâches du jour ! Bravo !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCongratsDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
        {openCongratsDialog && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </Dialog>
    </div>
  );
}

export default TodoPage;