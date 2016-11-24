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
	"serialNumber" character varying(255), --编号
	"educationNumber" character varying(255), --教育部分类号
	"financeNumber" character varying(255), --财政部分类号
	"countryCode" character varying(255), --国别码
	name character varying(255), --名称
	version character varying(255), --型号
	spec character varying(255), --规格
	type character varying(255), --类型
	manufacturer character varying(255), --生产厂家
	"prodDate" timestamp without time zone, --出厂日期
	"prodSign" character varying(255), --出厂号
	warranty timestamp without time zone, --质保期
	measure character varying(255), --计量单位
	price character varying(255), --单价
	"equipmentTotal" character varying(255),	--设备总额
	retailer character varying(255), --供货商家

	"userId" bigint, --用户ID
	username character varying(255),
	status character varying(255), --状态
	"obtainDate" timestamp without time zone, --取得时间
	"obtainWay" character varying(255), --取得方式
	"useIntent" character varying(255), --使用方向
	"useDepartment" character varying(255), --使用单位
	"storeLocationNumber" character varying(255), --存放地点编号
	"storeLocation" character varying(255), --存放地点
	"assertInventory" character varying(255), --资产清查
	comment character varying(255), --备注

	"fundNumber" character varying(255), --经费编号
	"fundSubject" character varying(255), --经费科目
	"fundName" character varying(255), --经费名称
	"fundDirector" character varying(255), --经费负责人

	"recordDate" timestamp without time zone, --入账日期
	"financeVoucherDate" timestamp without time zone, --财务凭单日期
	"financeVoucherNumber" character varying(255), --财务凭单号
	"billNumber" character varying(255), --单据编号
	"contractNumber" character varying(255), --合同编号
	agent character varying(255), --经办人
	CONSTRAINT equipment_pkey PRIMARY KEY ("id")
);

CREATE TABLE apply
(
	id bigserial NOT NULL,
	"userId" bigint, -- 申请人
	type character varying(255), --申请类型
	detail character varying(255), --申请详情
	"equipmentType" character varying(255), --设备类型
	"equipmentNumber" character varying(255), --设备编号
	"approvalUserIds" bigint [], --审批用户IDs
	"currentApprovalUserId" bigint, --当前审批用户ID
	"stepInfo" json, --步骤信息
	"currentStep" integer, --当前步骤
	comment character varying(255), --备注
	CONSTRAINT apply_pkey PRIMARY KEY ("id")
);

CREATE TABLE notification
(
	id bigserial NOT NULL,
	"acceptUserId" bigint, --接受通知人
	"makeUserId" bigint, --产生通知人
	type character varying(255), --类型 通过、未通过、审批
	content character varying(255), --消息内容
	read boolean, --是否已读
	ctime timestamp without time zone, --创建时间
	CONSTRAINT notification_pkey PRIMARY KEY ("id")
);

CREATE TABLE history
(
	id bigserial NOT NULL,
	"userId" bigint,
	"equipmentId" bigint,
	content character varying(255),
	ctime timestamp without time zone, --创建时间
	CONSTRAINT history_pkey PRIMARY KEY ("id")
);

