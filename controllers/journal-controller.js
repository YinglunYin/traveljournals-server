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

    let createJournal = async (req, res) => {
        const title = req.body.title;
        const textRaw = req.body.textRaw;
        const textHtml = req.body.textHtml;
        const abstract = req.body.abstract;
        const place = req.body.place;
        const author = req.body.author;

        let re = await journalServices.createJournal({
                                                           title: title,
                                                           textRaw: textRaw,
                                                           textHtml: textHtml,
                                                           abstract: abstract,
                                                           place: place,
                                                           author, author
                                                       })

        if (re === 9) {
            utils.responseClient(res, 400, 9,
                                 "journal created failed",
                                 {})

        } else {
            utils.responseClient(res, 200, 10,
                                 "Journal Created Successfully",
                                 {id: re._id})
        }
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

    let updateJournal = async (req, res) => {
        const _id = req.body._id;
        const textRaw = req.body.textRaw;
        const textHtml = req.body.textHtml;
        const title = req.body.title;
        const abstract = req.body.abstract;
        const place = req.body.place;

        let re = await journalServices.updateJournal(_id, {
            textRaw: textRaw,
            textHtml: textHtml,
            title: title,
            abstract: abstract,
            place: place
        })

        if(re === 14){
            utils.responseClient(res, 200, 14, 'Update successfully')
        }else{
            utils.responseClient(res, 400, 13, 'Update failed')
        }

    }

    let likeJournal = async (req, res) => {
        const username = req.body.username;
        const journalId = req.body.journalId;
        const likeFlag = req.body.likeFlag;
        if (likeFlag === 'like') {
            let code = await journalServices.likeAJournal(username, journalId)
            if (code === 16) {
                utils.responseClient(res, 200, 16, "like successfully")
            } else {
                utils.responseClient(res, 200, 15, "repeat")
            }
        }else if(likeFlag === 'dislike'){
            let code = await journalServices.dislikeAJournal(username, journalId)
            if (code === 16) {
                utils.responseClient(res, 200, 16, "dislike successfully")
            } else {
                utils.responseClient(res, 200, 15, "repeat")
            }
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
        journalServices.deleteJournal(journalId)
            .then((re) => {
                console.log("succ")
                console.log(re)
                utils.responseClient(res, 200, 22, "delete succeed", re)
            }).catch((err) => {
            console.log("error")
            console.log(err)
        })
    }

    let findPlaceJournal = (req, res) => {
        const placeId = req.body.placeId
        journalsDao.findPlaceJournal(placeId)
            .then((re) => {
                if (re) {
                    utils.responseClient(res, 200, 26, "successgully", re.journals)
                } else {
                    utils.responseClient(res, 200, 25, "none", {})
                }
            })
    }

    let findAllJournals = async (req, res) => {
        let re = await journalServices.findAllJournals()
        if(re === 33){
            utils.responseClient(res, 400, 33, "failed")
        }else{
            utils.responseClient(res, 200, 34, "succeed", re)
        }
    }

    app.post('/api/journals/createJournal', createJournal)
    app.post('/api/journals/findJournal/:by', findJournals)
    app.post('/api/journals/updateJournal', updateJournal)
    app.post('/api/journals/like', likeJournal)
    app.post('/api/journals/popular', findPopularJournal)
    app.post('/api/journals/delete', deleteJournal)
    app.post('/api/journals/place', findPlaceJournal)
    app.post('/api/journals/journals', findAllJournals)
    // const add = (req, res) => {
    //     const a = parseInt(req.params['paramA'])
    //     const b = parseInt(req.params['paramB'])
    //     res.send(`${a + b}`)
    // }
    //
    // app.get('/add/:paramA/:paramB', add)

}
