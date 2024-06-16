import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardActions, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Grid, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import axios from 'axios';
import ClassCreation from './classCreateFolder/ClassCreation';

const New = () => {
  const [classData, setClassData] = useState([]);
  const [toggleBox, setToggleBox] = useState(null);
  const [updateCards, setUpdateCards] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes/get');
      setClassData(response.data);
    } catch (error) {
      console.error('Failed to fetch class data:', error);
      toast.error('Failed to fetch class data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateCards]);

  const handleToggleBox = (index) => {
    setToggleBox(toggleBox === index ? null : index);
  };

  const confirmDelete = (id) => {
    setDeleteClassId(id);
    setShowConfirmation(true);
  };

  const deleteFunc = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/delete/${deleteClassId}`);
      toast.success('Class Deleted Successfully');
      setUpdateCards(!updateCards);
    } catch (error) {
      console.error('Failed to delete the class:', error);
      toast.error('Failed to delete the class');
    } finally {
      setShowConfirmation(false);
      setDeleteClassId(null);
    }
  };

  const startEdit = (classData) => {
    setEditingClass(classData);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box boxShadow={3} borderRadius={2} overflow="hidden">
            <ClassCreation 
              setUpdateCards={setUpdateCards} 
              updateCards={updateCards} 
              editingClass={editingClass}
              setEditingClass={setEditingClass}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box height="80vh" overflow="auto">
            <Grid container spacing={3}>
              {classData.map((element, index) => (
                <Grid item xs={12} sm={6} md={4} key={element?._id}>
                  <Card sx={{ backgroundColor: '#F3EEEA', position: 'relative' }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {element?.className}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Room: {element?.roomNumber}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="more options" onClick={() => handleToggleBox(index)}>
                        <MoreHorizIcon />
                      </IconButton>
                      {toggleBox === index && (
                        <Box position="absolute" top={0} right={0} bgcolor="white" zIndex={1} boxShadow={3} borderRadius={1}>
                          <IconButton onClick={() => startEdit(element)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => confirmDelete(element?._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteFunc} color="secondary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default New;
