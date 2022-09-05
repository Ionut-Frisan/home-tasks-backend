const asyncHandler = require("../middleware/asyncHandler");
const {Op} = require("sequelize");
const Day = require("../models/day");
const Task = require("../models/tasks");

exports.getDays = asyncHandler(async (req, res, next) => {
  const days = await Day.findAll({
    include: [
      {
        association: Day.Tasks,
        include: Task.Comments,
      },
    ],
    order: [
      ['date', 'ASC']
    ]
  });
  if (days !== null) {
    res.send(days);
  } else res.status(400).send([]);
});

exports.getDay = asyncHandler(async (req, res, next) => {
  const requiredId = req.params.id;
  const day = await Day.findOne({where: {id: requiredId}});
  if (day !== null) res.send(day);
  else res.status(400).send({});
});

exports.generateCalendar = asyncHandler(async (req, res, next) => {
  await Day.destroy({where: {}, cascade: true});
  await Task.destroy({
    where: {
      [Op.and]: {
        dayId: null,
        displayInFE: false,
      }
    }
  })
  const calendar = await getCalendar(req.body);

  const calendarDb = Day.bulkCreate(calendar, {include: Day.Tasks});

  res.send(calendarDb);
});

const getTasks = async () => {
  const tasks = await Task.findAll({include: Task.Comments});
  return (
    tasks.map((task) => {
      task = task.toJSON();
      delete task["id"];
      delete task["dayId"];
      task["comments"] = [];
      task.displayInFE = false;
      return task;
    }) || []
  );
};

const getCalendar = async (data) => {
  const persons = data.persons;
  const interval = data?.interval || 3;
  const period = data?.period || 90;

  let tasks = await getTasks();
  // console.log(tasks);
  const date = data.date || new Date();
  const startDate =
    new Date(date.getFullYear(), date.getMonth(), date.getDate()) || new Date();
  startDate?.setDate(startDate.getDate() - interval);

  const count = Math.floor(period / interval);

  let computedPersons = [];
  for (let i = 0; i <= count; i++) {
    computedPersons = [...computedPersons, ...persons];
  }

  let calendar = [];

  for (let i = 0; i < count; i++) {
    calendar.push({
      date: new Date(startDate.setDate(startDate.getDate() + interval)),
      person: computedPersons[i],
      tasks: tasks,
    });
  }

  return calendar;
};

// export const generateCalendar = asyncHandler(async (req, res, next) => {
//   db.read();
//
//   const persons = req.body.persons;
//   const interval = req.body?.interval || 3;
//   const period = req.body?.period || 90;
//   let tasks = db.data['tasks'];
//   const date = req.body.startDate;
//   const startDate = new Date(date.year, date.month, date.day) || new Date();
//   startDate?.setDate(startDate.getDate() - interval);
//
//   const count = Math.floor(period/interval);
//   let calendar = [];
//
//   if(!tasks){
//     tasks = []
//   }
//
//   tasks = tasks.map((task) => {
//     return {...task, status: 'not started', created: new Date(), updated: new Date()}
//   })
//
//   let computedPersons = []
//   for(let i=0; i <= count; i++){
//     computedPersons = [...computedPersons, ...persons]
//   }
//
//   for(let i= 0; i < count; i++){
//     // let intervalMultiplier = findClosestMultiplier(i, 3);
//    calendar.push({date : new Date(startDate.setDate(startDate.getDate() + interval)), person: computedPersons[i], id: v4(), tasks})
//   }
//
//   db.data['calendar'] = calendar;
//
//   db.write();
//
//   res.json(db.data['calendar']);
// })
//
// export const changeTaskStatus = asyncHandler(async (req, res, next) => {
//   db.read();
//   const taskId = req.body.taskId;
//   const dayId = req.body.dayId;
//   const status = req.body.status;
//
//   const data = db.data['calendar'];
//   const dayToModify = data.filter((day) => {
//     return day.id === dayId
//   })
//
//   if(dayToModify[0]?.tasks){
//     dayToModify[0].tasks = dayToModify[0].tasks.map((task) => {
//       if( task.id === taskId){
//         task.status = status;
//         task.updated = new Date();
//       }
//       return task;
//     })
//     db.write();
//     res.json(db.data['calendar']);
//   }
//   else res.status(400).send('not found')
// })
//
// export const addCommentToTask = asyncHandler(async (req, res, next) => {
//   db.read();
//   const taskId = req.body.taskId;
//   const dayId = req.body.dayId;
//   const comment = req.body.comment;
//
//   const data = db.data['calendar'];
//   const dayToModify = data.filter((day) => {
//     return day.id === dayId
//   })
//
//   if(dayToModify[0]?.tasks){
//     dayToModify[0].tasks = dayToModify[0].tasks.map((task) => {
//       if( task.id === taskId){
//         task.comments = [...task.comments, comment];
//       }
//       return task;
//     })
//     db.write();
//     res.json(db.data['calendar']);
//   }
//   else res.status(400).send('not found')
// })
//
// export const addTaskToDay = asyncHandler(async (req, res, next) => {
//   db.read();
//   const dayId = req.params.dayId;
//   let task = req.body;
//
//   task['type'] = 'user_added'
//   task['comments'] = []
//   task['created'] = new Date();
//   task['updated'] = new Date();
//   task['status'] = 'not started';
//   task['id'] = v4();
//
//   let day = db.data['calendar'].filter((day) => day.id === dayId);
//   day[0]['tasks'] = [...day[0].tasks, task];
//
//   db.write();
//   res.json(db.data['calendar']);
// })
