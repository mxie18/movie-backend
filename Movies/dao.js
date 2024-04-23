import movieModel from "./model.js";
import model from "./model.js";
export const findAllMovies = model.find();
export const findMovieById = (id) => model.findById(id);
// export const findAlbumByAlbumId = (albumId) => model.findOne({ albumId });
export const createMovie = (movie) => model.create(movie);
export const updateMovie = (movieId, movie) =>
    model.updateOne({ movieId }, { $set: movie });
export const deleteMovie = (movieId) => model.deleteOne({ movieId });

export const findExternalMovieId = async (movieId) => {
    const movie = await movieModel.findById(movieId);
    return movie.movieId;
    // const user = await userModel.findById(userId).populate("moviesLiked");
    // return user.moviesLiked;
};
