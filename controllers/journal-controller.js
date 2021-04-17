const journalServices = require("../services/journals-service")
const placeServer = require("../services/place-service")
const userServer = require("../services/user-service")
const utils = require("../utils/utils")
const userDao = require("../daos/user-dao")
const journalsDao = require("../daos/journals-dao")

const getPhoto = (photos) => {
    if (photos !== undefined) {
        let l = photos.length
        if (l === 0) {
            return ""
        } else {
            let p = Math.floor(Math.random() * l)
            return photos[p].photo_reference
        }
    } else {
        return ""
    }
}

module.exports = (app) => {

    let createJournal = (req, res) => {
        const title = req.body.title;
        const textRaw = req.body.textRaw;
        const textHtml = req.body.textHtml;
        const abstract = req.body.abstract;
        const place = req.body.place;
        const author = req.body.author;

        userDao.findUserById(author)
            .then((user) => {
                placeServer.findPlaceById(place.place_id)
                    .then((re_p) => {
                        if (re_p) {
                            // place exist
                            journalServices.createJournal({
                                                              title: title,
                                                              textRaw: textRaw,
                                                              textHtml: textHtml,
                                                              abstract: abstract,
                                                              author: user._id,
                                                              img: getPhoto(place.photo),
                                                              place: re_p._id,
                                                              liker: []
                                                          })
                                .then((re_j) => {
                                    // add journal to user
                                    userServer.addJournalToUser(author, re_j._id)
                                        .then((re_u) => {
                                            placeServer.addJournalToPlace(re_p._id, re_j._id)
                                                .then(() => {
                                                    let newJournal = {
                                                        id: re_j._id
                                                    }
                                                    utils.responseClient(res, 200, 10,
                                                                         "Journal Created Successfully",
                                                                         newJournal)
                                                })
                                        })

                                })

                        } else {
                            // place not exist
                            placeServer.createPlace({
                                                        _id: place.place_id,
                                                        name: place.name,
                                                        address: place.address,
                                                        lat: place.lat,
                                                        lng: place.lng,
                                                        journals: []
                                                    })
                                .then((re_p) => {
                                    journalServices.createJournal({
                                                                      title: title,
                                                                      textRaw: textRaw,
                                                                      textHtml: textHtml,
                                                                      abstract: abstract,
                                                                      author: user._id,
                                                                      img: getPhoto(place.photo),
                                                                      place: re_p._id,
                                                                      liker: []
                                                                  })
                                        .then((re_j) => {
                                            // add journal to user
                                            userServer.addJournalToUser(author, re_j._id)
                                                .then((re_u) => {
                                                    placeServer.addJournalToPlace(re_p._id,
                                                                                  re_j._id)
                                                        .then(() => {
                                                            let newJournal = {
                                                                id: re_j._id
                                                            }
                                                            utils.responseClient(res, 200, 10,
                                                                                 "Journal Created Successfully",
                                                                                 newJournal)
                                                        })
                                                })

                                        })
                                })
                        }
                    })
            })
    }

    let findJournals = (req, res) => {
        const by = req.params['by']
        switch (by) {
            case "id":
                journalServices.findJournalById(req.body.id)
                    .then((re) => {
                        if (re) {
                            utils.responseClient(res, 200, 12, "find successfully", re)
                        }
                    })
                break;

            default:
                utils.responseClient(res, 400, 11, "find failed")
        }

    }

    let updateJournal = (req, res) => {
        const _id = req.body._id;
        const textRaw = req.body.textRaw;
        const textHtml = req.body.textHtml;
        const title = req.body.title;
        const abstract = req.body.abstract;

        journalServices.updateJournal(_id, {
            textRaw: textRaw,
            textHtml: textHtml,
            title: title,
            abstract: abstract,
        })
            .then((re) => {
                if (re) {
                    utils.responseClient(res, 200, 14, 'Update successfully')
                }
            })
    }

    let likeJournal = (req, res) => {
        const userId = req.body.userId;
        const journalId = req.body.journalId;
        const likeFlag = req.body.likeFlag;
        if (likeFlag === 'like') {
            userDao.addJournalTolikes(userId, journalId)
                .then((re) => {
                    if (re.nModified >= 1) {
                        journalsDao.likeAJournal(userId, journalId)
                            .then((re) => {
                                utils.responseClient(res, 200, 16, "like successfully", re)
                            })
                    }else{
                        utils.responseClient(res, 200, 15, "repeat", re)
                    }
                })
        }
    }

    let findPopularJournal = (req, res) => {
        const num = req.body.num;
        journalServices.findPopularJournal(num)
            .then((re) => {
                if (re) {
                    utils.responseClient(res, 200, 18, "popular successfully", re)
                } else {
                    utils.responseClient(res, 400, 17, "popular failed", {})
                }
            })
    }

    let deleteJournal = (req, res) => {
        const journalId = req.body.id;
        journalServices.findJournalById(journalId)
            .then((re) => {
                userServer.removeJournalFromUser(re.author._id, journalId)
                    .then((re1) => {
                        userDao.deleteJournal(journalId)
                            .then((re2) => {
                                journalsDao.deleteJournal(journalId)
                                    .then(() => {
                                        utils.responseClient(res, 200, 22, "successgully", {})
                                    })
                            })
                    })
            })
    }

    let findPlaceJournal = (req, res) => {
        const placeId = req.body.placeId
        journalsDao.findPlaceJournal(placeId)
            .then((re)=>{
                if(re){
                    utils.responseClient(res, 200, 26, "successgully", re.journals)
                }else{
                    utils.responseClient(res, 200, 25, "none", {})
                }
            })
    }

    app.post('/api/journals/createJournal', createJournal)
    app.post('/api/journals/findJournal/:by', findJournals)
    app.post('/api/journals/updateJournal', updateJournal)
    app.post('/api/journals/like', likeJournal)
    app.post('/api/journals/popular', findPopularJournal)
    app.post('/api/journals/delete', deleteJournal)
    app.post('/api/journals/place', findPlaceJournal)
    // const add = (req, res) => {
    //     const a = parseInt(req.params['paramA'])
    //     const b = parseInt(req.params['paramB'])
    //     res.send(`${a + b}`)
    // }
    //
    // app.get('/add/:paramA/:paramB', add)

}
