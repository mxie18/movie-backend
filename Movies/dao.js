import model from "./model.js";
export const findAllMovies = model.find();
export const findMovieById = (id) => model.findById(id);
// export const findAlbumByAlbumId = (albumId) => model.findOne({ albumId });
export const createMovie = (movie) => model.create(movie);
export const updateMovie = (movieId, movie) =>
    model.updateOne({ movieId }, { $set: movie });
export const deleteMovie = (movieId) => model.deleteOne({ movieId });
