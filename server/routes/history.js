import express from 'express';
import HistoryDao from '../dao/history';
import resetResponse from '../utils/response';

const historyRoute = express.Router();
const historyDao = new HistoryDao();

historyRoute.post('/getHistory', async (req, res) => {
	const {filter, currentCount} = req.body;
	const allCount = await historyDao.count(filter);
	const history = await historyDao.offsetHistory(filter, currentCount);
	const hasOlder = (history.length + currentCount) < allCount;
	res.send(resetResponse(true, {history, hasOlder}));
});

export default historyRoute;