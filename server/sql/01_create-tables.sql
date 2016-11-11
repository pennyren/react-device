CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	pwd character varying(255),
	ctime timestamp without time zone,
	utime timestamp  without time zone,
	role character varying(128),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE equipment
(
	id bigserial NOT NULL, 
	serialNumber character varying(255), --编号
	name character varying(255), --名称
	educationNumber character varying(255), --教育部分类号
	financeNumber character varying(255), --财政部分类号
	version character varying(255), --型号
	type character varying(255), --类型
	status character varying(255), --状态
	spec character varying(255), --规格
	measure character varying(255), --计量单位
	price bigint, --单价
	countryCode character varying(255), --国别码
	manufacturer character varying(255), --生产厂家
	prodSign character varying(255), --出厂号
	prodDate timestamp without time zone, --出厂日期
	obtainWay character varying(255), --取得方式
	obtainDate timestamp without time zone, --取得时间
	fundNumber character varying(255), --经费编号
	fundSubject character varying(255), --经费科目
	fundName character varying(255), --经费名称
	fundDirector character varying(255), --经费负责人
	billNumber character varying(255), --单据编号
	useIntent character varying(255), --使用方向
	useDepartment character varying(255), --使用单位
	storeLocationNumber character varying(255), --存放地点编号
	storeLocation character varying(255), --存放地点
	agent character varying(255), --经办人
	recordDate timestamp without time zone, --入账日期
	retailer character varying(255), --供货商家
	contractNumber character varying(255), --合同编号
	warranty character varying(255), --质保期
	comment character varying(255), --备注
	financeVoucherNumber character varying(255), --财务凭单号
	financeVoucherDate timestamp without time zone, --财务凭单日期
	equipmentTotal bigint,	--设备总额
	assertInventory character varying(255), --资产清查
	userId bigint, --用户id
	CONSTRAINT equipment_pkey PRIMARY KEY ("id")
);