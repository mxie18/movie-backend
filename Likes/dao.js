import userModel from "../Users/model.js";
import movieModel from "../Movies/model.js";

export const userLikesMovie = async (userId, movie) => {
    const user = await userModel.findById(userId);
    let movieDB = await movieModel.findOne({ movieId: movie.movieId });

    if (!movieDB) {
        movieDB = await movieModel.create(movie);
    }

    user.moviesLiked.push(movieDB._id);
    movieDB.likedBy.push(user._id);
    await user.save();
    await movieDB.save();
    return user;
};

export const userUnlikesMovie = async (userId, movieId) => {
    const user = await userModel.findById(userId);
    const movie = await movieModel.findOne({ movieId: movieId });
    user.moviesLiked = user.moviesLiked.filter((id) => !id.equals(movie._id));
    movie.likedBy = movie.likedBy.filter((id) => !id.equals(user._id));
    await user.save();
    await movie.save();
    return user;
};

export const findMoviesLikedByUser = async (userId) => {
    const user = await userModel.findById(userId).populate("moviesLiked");
    return user.moviesLiked;
};

export const findUsersWhoLikedMovie = async (movieId) => {
    const movie = await movieModel.findOne({ movieId }).populate("likedBy");
    if (!movie) {
        return [];
    }
    return movie.likedBy;
};
