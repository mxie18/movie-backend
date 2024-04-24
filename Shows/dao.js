import showModel from "./model.js";

export const findExternalShowId = async (showId) => {
    const show = await showModel.findById(showId);
    return show.showId;
};
