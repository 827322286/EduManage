let vIndicatorRelat = new Vue({
    el: '#indicatorRelat',
    data: function () {
        return {
            firstPath: '/indicator/indicatorRelat',// 请求一级路径
            relatTree: [],// 指标关联树
            loadingMsg: '',// 加载提示
            notice: '',// 提醒对象
            indicatorRelat: {
                id: '', indicatorId: '', indicatorFirstId: '', indicatorSecId: '', indicatorThirdId: '', remark: '',
            },// 指标关联实体类
            sIndicatorRelat: {
                yearPlanId: '',graduationState:'B'
            },// 搜索条件
            indicatorRemove: {
                node: '', data: ''
            },// 树删除临时变量
            removeIndicatorRelatModal: false,// 删除指标关联模态框
            graduationModal:false,//添加毕业要求指标点模态框
            indicatorFirstModal: false,// 添加一级指标点模态框
            indicatorSecModal: false,// 添加二级指标点模态框
            admitModel:false,//提交指标点模态框

            yearPlanList: [],//年份集合,
            courseInfoList: [],//课程信息集合

            graduationList: [],//毕业要求指标点集合
            indicatorFirstList: [],// 一级指标集合
            indicatorSecList: [],//二级指标集合
            indicatorThirdList: [],//三级指标集合
        }
    },
    components: {
        'layout-header': httpVueLoader('/layout/layout-header.vue'),
        'layout-sider': httpVueLoader('/layout/layout-sider.vue'),
        'layout-footer': httpVueLoader('/layout/layout-footer.vue')
    },
    mounted() {


        this.initPage();
        this.getIndicatorList();
    },
    methods: {
        /**
         * 页面初始化加载项
         */
        initPage() {
            this.getIndicator(); // 获取毕业要求指标集合
            this.getYearPlanList();
            this.getCourseInfoList();
        },

        /**
         * 获取年份集合
         */
        getYearPlanList() {
            let url = '/manage/yearPlan/selectYearPlanList';
            callAjaxGetNoParam(url, this.getYearPlanListSuc);
        },
        getYearPlanListSuc(data) {
            this.yearPlanList = data.obj;
            console.log(this.yearPlanList);
        },

        /**
         * 获取课程信息集合
         */
        getCourseInfoList() {
            let url = '/manage/courseInfo/listCourseInfo';
            callAjaxGetNoParam(url, this.getCourseInfoListSuc);
        },
        getCourseInfoListSuc(data) {
            this.courseInfoList = data.obj;
        },

        /**	
         * 查询指标树
         */
        getIndicatorList() {
            let data = {
                yearPlanId: this.sIndicatorRelat.yearPlanId,
                graduationState:this.sIndicatorRelat.graduationState,
            };
            let url = this.firstPath + '/selectIndicatorList';
            callAjaxPost(url, data, this.getIndicatorListSuc);
            this.loadingMsg = messageLoading();
        },
        getIndicatorListSuc(data) {
         /*   console.log("出来吧data：",data);*/
            closeMessageLoading(this.loadingMsg);
            this.relatTree = data.obj;
        },

        /**
         * 根据当前节点选择自字节（一级）
         * @param data
         */
        getByTreeIdFirst(data) {
            // 清空当前实体类
            this.clearIndicatorRelat();
            // 清空一级指标集合
            this.indicatorFirstList = [];
            this.indicatorSecList = [];

            let treeList = data.id.split("-");
            console.log("DATA::",data);
            console.log("treeList:",treeList[2]);
            switch (data.treeLevel) {
                case 1:
                    this.getIndicatorFirst(treeList[1]);
                    break;
                case 2:
                    this.getIndicatorSec(treeList[1], treeList[2]);
                    break;
                default:
                    break
            }
            //666
            this.openIndicatorFirstModal();
        },

        /**
         * 根据当前节点选择自字节（二级）
         * @param data
         */
        getByTreeIdSecond(data) {
            // 清空当前实体类
            this.clearIndicatorRelat();
            // 清空一级指标集合
            this.indicatorFirstList = [];
            this.indicatorSecList = [];

            let treeList = data.id.split("-");
            console.log("DATA::",data);
            console.log("treeList:",treeList[1]+","+treeList[2]);
            switch (data.treeLevel) {
                case 1:
                    this.getIndicatorFirst(treeList[1]);
                    break;
                case 2:
                    this.getIndicatorSec(treeList[1], treeList[2]);
                    break;
                default:
                    break
            }
            //666
            this.openIndicatorSecModal();
        },
        /**
         * 查询在指标关联表中未使用的指标点集合
         */
        getIndicator() {
            let url = this.firstPath + '/selectNotUseIndicatorList';
            callAjaxGetNoParam(url, this.getIndicatorSuc);
        },
        getIndicatorSuc(data) {
            console.log(data);
            this.graduationList = data.obj;
        },

        /**
         * 查询在指标关联表中未使用的一级指标集合
         * @param indicatorId  指标点id
         */
        getIndicatorFirst(indicatorId) {
            this.indicatorRelat.indicatorId = indicatorId;
            let data = indicatorId;
            let url = this.firstPath + '/selectNotUseIndicatorFirstList';
            callAjaxPost(url, data, this.getIndicatorFirstSuc);
        },
        getIndicatorFirstSuc(data) {
            console.log(data);
            this.indicatorFirstList = data.obj;
        },

        /**
         * 查询在指标关联表中未使用的二级指标集合
         */
        getIndicatorSec(indicatorId, indicatorFirstId) {
            this.indicatorRelat.indicatorId = indicatorId;
            this.indicatorRelat.indicatorFirstId = indicatorFirstId;
            let data = {
                indicatorId: indicatorId,
                indicatorFirstId: indicatorFirstId
            };
            let url = this.firstPath + '/selectNotUseIndicatorSecList';
            callAjaxPost(url, data, this.getIndicatorSecSuc);
        },
        getIndicatorSecSuc(data) {
            console.log(data);
            this.indicatorSecList = data.obj;
        },

        
        /**
         * 添加零级指标点
         */
        addIndicatorRelat() {
        	 if(checkEmpty(this.indicatorRelat.indicatorId,'请选择毕业要求指标点！')){
                 return;
             }
            let data = {
                indicatorId: this.indicatorRelat.indicatorId,
            };
            let url = this.firstPath + '/insert';
            callAjaxPost(url, data, this.addIndicatorRelatSuc);
            this.loadingMsg = messageLoading();
        },

        addIndicatorRelatSuc(data) {
            closeMessageLoading(this.loadingMsg);
            this.clearIndicatorRelat();
            messageSuccess("添加成功");
            // 重新查询数据
            this.getIndicatorList();
            // 清除指标关联
            this.clearIndicatorRelat();
            this.graduationModal= false;

        },
        
        
        /**
         * 添加一级指标点
         */
        addIndicatorFirst() {
            if(checkEmpty(this.indicatorRelat.indicatorFirstId,'请选择一级指标！')){
                return;
            }
            let data = {
                indicatorId: this.indicatorRelat.indicatorId,
                indicatorFirstId: this.indicatorRelat.indicatorFirstId,
            };
            let url = this.firstPath + '/insert';
            callAjaxPost(url, data, this.addIndicatorFirstSuc);
            this.loadingMsg = messageLoading();
        },

        addIndicatorFirstSuc(data) {
            closeMessageLoading(this.loadingMsg);
            this.clearIndicatorRelat();
            messageSuccess("添加成功");
            // 清除一级、二级指标点
            this.indicatorFirstList = [];
            this.indicatorSecList = [];

            // 重新查询数据
            this.getIndicatorList();
            // 清除指标关联
            this.clearIndicatorRelat();
            this.indicatorFirstModal= false;

        },
        
        /**
         * 添加二级指标点
         */
        addIndicatorSec() {
            if(checkEmpty(this.indicatorRelat.indicatorSecId,'请选择二级指标！')){
                return;
            }
            let data = {
                indicatorId: this.indicatorRelat.indicatorId,
                indicatorFirstId: this.indicatorRelat.indicatorFirstId,
                indicatorSecId: this.indicatorRelat.indicatorSecId
            };
            let url = this.firstPath + '/insert';
            callAjaxPost(url, data, this.addIndicatorSecSuc);
            this.loadingMsg = messageLoading();
        },

        addIndicatorSecSuc(data) {
            closeMessageLoading(this.loadingMsg);
            this.clearIndicatorRelat();
            messageSuccess("添加成功");
            // 清除一级、二级指标点
            this.indicatorFirstList = [];
            this.indicatorSecList = [];

            // 重新查询数据
            this.getIndicatorList();
            // 清除指标关联
            this.clearIndicatorRelat();
            this.indicatorSecModal= false;

        },

        /**
         * 打开删除模态框
         * @param node
         * @param data
         */
        openRemoveModal(node, data) {
            this.removeIndicatorRelatModal = true;
            this.indicatorRemove.node = node;
            this.indicatorRemove.data = data;
            console.log("就决定是你了node：",node)
            console.log("就决定是你了data：",data)
        },

        /**
         * 根据节点删除
         * @param node
         * @param data
         */
        removeIndicatorRelat() {
            console.log(this.indicatorRemove.data);
            let treeList = this.indicatorRemove.data.id.split("-");
            console.log(treeList);
            let postData = {
                indicatorId: treeList[1],
                indicatorFirstId: treeList[2],
                indicatorSecId: treeList[3]
            };
            let url = this.firstPath + '/delete';
            callAjaxPost(url, postData, this.removeIndicatorRelatSuc);
            this.loadingMsg = messageLoading();
        },
        removeIndicatorRelatSuc(data) {
            closeMessageLoading(this.loadingMsg);
            messageSuccess('删除成功');
            this.getIndicatorList();
        },

        /**
         * 清除实体类
         */
        clearIndicatorRelat() {
            this.indicatorRelat.indicatorId = '';
            this.indicatorRelat.indicatorFirstId = '';
            this.indicatorRelat.indicatorSecId = '';
            this.indicatorRelat.indicatorThirdId = '';
            this.indicatorRelat.remark = '';
        },

        /**
         * 清空搜索类
         */
        clearSIndicatorRelat() {
            this.sIndicatorRelat.yearPlanId = '';
        },

        /**
         * 打开新增毕业要求指标点模态框
         */
        openGraduationModal(){
            this.graduationModal=true;
        },
        /**
         * 关闭新增毕业要求指标点模态框
         */
        closeGraduationModal(){
            // 清除指标关联
            this.clearIndicatorRelat();
            this.graduationModal=false;
        },

        /**
         * 打开添加一级指标点模态框
         */
        openIndicatorFirstModal(){
            this.indicatorFirstModal=true;
        },

        /**
         * 关闭添加一级指标点模态框
         */
        closeIndicatorFirstModal(){
            // 清除指标关联
            this.clearIndicatorRelat();
            this.indicatorFirstModal=false;
        },

        /**
         * 打开添加二级指标点模态框
         */
        openIndicatorSecModal(){
            this.indicatorSecModal=true;
        },

        /**
         * 关闭添加二级指标点模态框
         */
        closeIndicatorSecModal(){
            // 清除指标关联
            this.clearIndicatorRelat();
            this.indicatorSecModal=false;
        },

        /**
         * 打开提交指标点模态框
         */
        openAdmitModel(data){
            this.indicatorRelat.indicatorId=data.indicatorId;
            this.admitModel=true;
        },

        /**
         * 提交按钮
         * @param data
         */
        admit(){

            let data =this.indicatorRelat.indicatorId;
            let url='/indicator/graduation/admit';
            callAjaxPost(url, data, this.admitSuc );
        },
        admitSuc(data){
            messageSuccess('提交成功');
            this.closeAdmitModel();

            this.sIndicatorRelat.graduationState='A';
            //重新查询数据
            this.getIndicatorList();
        },


        /**
         * 关闭提交指标点模态框
         */
        closeAdmitModel(){
            // 清除指标关联
            this.clearIndicatorRelat();
            this.admitModel=false;
        },


//000
    }
});

