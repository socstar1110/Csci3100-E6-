const express = require('express');
const router = express.Router();
const { User, Course } = require('./mongoose');

router.post('/searchbycondition', (req, res) => {
    console.log(req.body)
    if (req.body['Value'].length > 0) {

        // Searching according to the serach fields
        switch (req.body['Conditon']) {
            
            // Search field is department
            case 'department':
                Course.find({ Department: req.body['Value'] })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        console.log(error);
                        res.send([]);
                    })
                break;

            // Search field is instructor
            case 'instructor':
                Course.find({ Instructor: req.body['Value'] })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        res.send([]);
                    })
                break;
				
			 // Search field is data
			case 'date':
				Course.find({ Data: req.body['Value'] })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        res.send([]);
                    })
                break;
			// Search field is time
			case "time":
				if(req.body['Value'] ==''){
					Course.find({ EndTime: req.body['Value'] })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        res.send([]);
                    })
                break;
				}
				Course.find({StartTime:req.body['Value']}).then(function(result){
					if(req.body['EndTime'] == ''){ // find the course by Start Time only
						res.send((result)) 
					}else{
						const temp = result // loop temp instead of result diectly, in case any error 
						for(let i = 0; i<temp.length; i++){
							if(temp[i].EndTime != req.body['EndTime']){ // drop the course do not match with the End time 
								result.splice(i, 1)
								i--
							}
						}
						res.send(result)
					}
                //console.log(result[0].EndTime)
				})
				.catch(() => {
                        res.send([]);
                })
				break;
				
            // Search field is courseid
            case 'courseid':

                Course.find({ CourseId: { $regex: `^${req.body['Value']}` } })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        res.send([]);
                    })
                break;

            // Search field is coursename
            case 'coursename':
                const keyword1 = req.body['Value'].split(/[,\s]+/);
                const checkingkw1 = keyword1.filter(Boolean).map(keyword => `(${keyword.trim()})`).join('|');
                Course.find({
                    CourseName: { $regex: new RegExp(checkingkw1, 'i') }
                })
                    .then((result) => {
                        res.send(result);
                    })
                    .catch(() => {
                        res.send([]);
                    });
                break;

            // Search field is other
            case 'other':
                const keyword2 = req.body['Value'].replace(/\s+/g, ' ').trim().split(' ');
                const checking2 = keyword2.map(keyword => new RegExp(keyword, 'i'));
                Course.find({
                    $or: [
                        { CourseCode: { $in: checking2 } },
                        { CourseName: { $in: checking2 } },
                        { CourseId: { $in: checking2 } },
                        { Venue: { $in: checking2 } },
                        { Department: { $in: checking2 } },
                        { Instructor: { $in: checking2 } },
                        { Outline: { $in: checking2 } }
                    ]
                })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch(() => {
                        res.send([]);
                    });
                break;
        }
    }
    else
        res.send([])

})

module.exports = router;