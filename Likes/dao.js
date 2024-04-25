import userModel from "../Users/model.js";
import movieModel from "../Movies/model.js";
import showModel from "../Shows/model.js";

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

export const removeUserLikes = async (userId) => {
    const user = await userModel.findById(userId);
    for (const movieId of user.moviesLiked) {
        const movie = await movieModel.findById(movieId);
        movie.likedBy = movie.likedBy.filter((id) => !id.equals(user._id));
        await movie.save();
    }
    for (const showId of user.showsLiked) {
        const show = await showModel.findById(showId);
        show.likedBy = show.likedBy.filter((id) => !id.equals(user._id));
        await show.save();
    }
};

export const findMoviesLikedByUser = async (userId) => {
    const user = await userModel.findById(userId).populate("moviesLiked");
    return user.moviesLiked;
};

export const findShowsLikedByUser = async (userId) => {
    const user = await userModel.findById(userId).populate("showsLiked");
    return user.showsLiked;
};

export const findUsersWhoLikedMovie = async (movieId) => {
    const movie = await movieModel.findOne({ movieId }).populate("likedBy");
    if (!movie) {
        return [];
    }
    return movie.likedBy;
};

export const userLikesShow = async (userId, show) => {
    const user = await userModel.findById(userId);
    let showDB = await showModel.findOne({ showId: show.showId });

    if (!showDB) {
        showDB = await showModel.create(show);
    }

    user.showsLiked.push(showDB._id);
    showDB.likedBy.push(user._id);
    await user.save();
    await showDB.save();
    return user;
};

export const userUnlikesShow = async (userId, showId) => {
    const user = await userModel.findById(userId);
    const show = await showModel.findOne({ showId: showId });
    user.showsLiked = user.showsLiked.filter((id) => !id.equals(show._id));
    show.likedBy = show.likedBy.filter((id) => !id.equals(user._id));
    await user.save();
    await show.save();
    return user;
};

export const findUsersWhoLikedShow = async (showId) => {
    const show = await showModel.findOne({ showId }).populate("likedBy");
    if (!show) {
        return [];
    }
    return show.likedBy;
};
