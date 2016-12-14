import crypto from 'crypto';
let store = {};

const set = (uid) => {
	const md5 = crypto.createHash('md5');
	const curTime = new Date();
	md5.update(curTime + '233');
	const d = md5.digest('hex');
	const prop = `uid_${uid}`;
	store[prop] && (delete store[prop]);
	store[prop] = d;
	const token = {
		sid: d,
		uid: uid
	};
	return token;
}

const get = (uid) => {
	return store[`uid_${uid}`];
}

const destroy = (uid) => {
	delete store[`uid_${uid}`];
}

const clear = () => {
	store = {};
}

const check = (req, res, next) => {
	const signinPath = '/user/signin';
	const {uid, sid} = req.cookies;
	const isLogin = req.path == signinPath;
	const isSigned = uid != undefined && store[`uid_${uid}`] == sid;
	isLogin ? next() : isSigned ? next() : res.redirect('/');
}

export default {get, set, destroy, clear, check};