package router

import (
	"github.com/gorilla/mux"
	"github.com/vikky225/golang-react-todo/middleware"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/api/task", middleware.GetAllTask).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/task", middleware.CreateTask).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/task/{id}", middleware.TaskComplete).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/undoTask/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/api/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")

	return r
}
