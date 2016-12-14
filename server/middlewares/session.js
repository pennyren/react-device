import crypto from 'crypto';
const store = {};

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

const get = (sid) => {

}

const destroy = (sid) => {

}

const clear = () => {

}

const check(sid) => {

}


export default {

};