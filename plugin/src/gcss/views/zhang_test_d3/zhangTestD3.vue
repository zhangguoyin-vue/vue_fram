<template id='abcd'>
  <div id="main" class="ln-mobile-alarm">
    <transition name="el-zoom-in-top">
      <el-card
        shadow="always"
        class="cardInfo"
        v-show="cardInfo.show"
        :body-style="{ padding: '0' }"
        v-bind:style="{top:getCardTop,left:getCardLeft}"
      >
        <div>
          <div v-for="item in alarmInfoList">
            <div>{{item.name}}</div>
            <div><img src="../../../imgs/arrow_l_1.png" /></div>
          </div>
        </div>
        <div>
          <div v-for="item in alarmInfo">
            <div>{{item.value}}</div>
            <div></div>
          </div>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script>
define(["vju"], function (Vue) {
  return Vue.component("zhang-test-d3", {
    template: template,
    data: function () {
      return {
        screenWidth: 2600,
        screenHeight: 1350,
        currCircleR: 50,
        curG:null,
        hoverG:null,
        alarmInfoLists:[],
        alarmInfoList:[],
        alarmInfo:[],
        tempLinkList:[],
        index:0,
        timer:null,
        timer0:null,
        toNext:false,
        curNodeSourceList: [],
        curLinkSourceList: [],
        cardInfo: {
          show: false,
          type: 0,
          top: 0,
          left: 0
        }
      };
    },

    computed: {
      getCardTop() {
        let top = this.screenHeight * 0.85;
        if (this.cardInfo.top + 150 > top) {
          return this.cardInfo.top - 250 + 50 + "px";
        }
        return this.cardInfo.top - 120 + "px";
      },
      getCardLeft() {
        let left = this.screenWidth * 0.85;
        if (this.cardInfo.left + 300 + 50 > left) {
          return this.cardInfo.left - 600 - 50 + "px";
        }
        return this.cardInfo.left + 50 + "px";
      }
    },

    destroyed(){   },

    //页面初始化完成后调用该方法
    mounted: function () {
      this.drawChart();
      this.filterNodeLine();
    },

    methods: {
      /* 绘制图表 */
      drawChart() {
        let svg = this.$d3
          .select("#main") // 选择 ID 为 main 的元素
          .append("svg") // 定义 svg
          .attr("width", this.screenWidth) // 设置 svg 宽度
          .attr("height", this.screenHeight) // 设置 svg 高度
          .on("click", this.svgBackGroundClick);

        // svg 的 g 元素类似于 div，加入的元素都放在 g 里面，g 可以设置统一的 css，里面的子元素会继承可继承css属性
        let g = svg.append("g").attr("transform", "translate(0,50)");
        this.curG =g;
        this.hoverG=svg.append("g").attr("transform", "translate(0,50)");
        this.getRectFirst(g);
        this.getRectMq(g);
        this.getRectCommand(g);
        let marker = g
          .append("marker")
          .attr("id", "arrow")
          .attr("viewBox", "0 0 10 10")
          .attr("refX", "10")
          .attr("refY", "5")
          .attr("markerWidth", "5")
          .attr("markerHeight", "4")
          .attr("orient", "auto");
        marker
          .append("path")
          .attr("stroke", "rgb(18, 150, 219)")
          .attr("stroke-width", "2")
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
          .attr("fill", "rgb(132, 194, 147)")
          .attr("d", "M 0 0 L 10 5 L 0 10");

        this.getDataTestByNode();
      },
      //第一层-背景图片显示区域
      getRectFirst: function(nodeRoot) {
        var node = nodeRoot.append("g").attr("transform", function(d) {
          return "translate(" + 380 + "," + 200 + ")";
        });
        node
          .append("image")
          .attr("xlink:href",function() {
            return "imgs/topo_bg.png";
          })
          .attr("src", function() {
            return "imgs/topo_bg.png";
          })
          //.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 1900)
          .attr("height", 200);
          //.attr("fill", "#333");
      },
      //MQ-背景图片显示区域
      getRectMq: function(nodeRoot) {
        var node = nodeRoot.append("g").attr("transform", function(d) {
          return "translate(" + 30 + "," + 730 + ")";
        });
        node
          .append("image")
          .attr("xlink:href",function() {
            return "imgs/order_bg.png";
          })
          .attr("src", function() {
            return "imgs/order_bg.png";
          })
          //.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 700)
          .attr("height", 160);
          //.attr("fill", "#333");
        node
          .append("text") // 绘制文本
          .attr("dx", 30)
          .attr("dy", 140)
          .style("text-anchor", "middle")
          .style("fill", "#8FB49F")
          .style("font-size", "20px")
          .text("MQ");
      },
      //命令中心-背景图片显示区域
      getRectCommand: function(nodeRoot) {
        var node = nodeRoot.append("g").attr("transform", function(d) {
          return "translate(" + 30 + "," + 930 + ")";
        });
        node
          .append("image")
          .attr("xlink:href",function() {
            return "imgs/order_bg.png";
          })
          .attr("src", function() {
            return "imgs/order_bg.png";
          })
          //.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 700)
          .attr("height", 160);
          //.attr("fill", "#333");
        node
          .append("text") // 绘制文本
          .attr("dx", 50)
          .attr("dy", 140)
          .style("text-anchor", "middle")
          .style("fill", "#8FB49F")
          .style("font-size", "20px")
          .text("命令中心");
      },
      //整合节点、连线数据结构
      initNodeLine:function(){
        var self=this;
        var svgNodeList = [];
        this.curNodeSourceList.forEach(function(item) {
          var tempNode = self.setNode(
            self.curG,
            item.nodID,
            item.nodNam,
            item.dx,
            item.dy,
            item.src
          );
          svgNodeList.push(tempNode);
        });
        this.curLinkSourceList.forEach(function(item) {
          var nodeA = svgNodeList.find(function(itemA) {
            if (itemA.id === item.AnodeId) {
              return itemA;
            }
            return null;
          });
          var nodeZ = svgNodeList.find(function(itemZ) {
            if (itemZ.id === item.ZnodeId) {
              return itemZ;
            }
            return null;
          });
          if (nodeA && nodeZ) {
            self.setLine(self.curG, nodeA, nodeZ);
          }
        });
      },
      //创建节点
      setNode: function(nodeRoot, id, name, x, y ,src) {
        var self=this;
        var uiId = "node_" + id;
        let d = this.$d3;
        var node = nodeRoot
          .append("g")
          .attr("id", uiId)
          .attr("transform", function() {
            return "translate(" + x + "," + y + ")";
          })
          .on("click", function() {
            self.svgNodeClick(d.event,node);
          });
        node
          .append("circle") // 绘制圆圈
          .attr("r", this.currCircleR)
          .attr("style", "fill: rgb(0, 47, 183)")
          .attr("stroke", "rgb(255, 255, 255)")
          .style("cursor", "pointer")
          .attr("stroke-width", "3");
        node
          .append("image") //增加图片标签
          .attr("width", 50)
          .attr("height", 50)
          .attr("xlink:href",function() {
            if (src) {
              return "imgs/" +src.toString();
            }
          })
          .attr("src", function() {
            if (src) {
              return "imgs/" + src.toString();
            }
          })
          .attr("x", -25)
          .attr("y", -25)
          .style("cursor", "pointer");
        node
          .append("text") // 绘制文本
          .attr("dx", function() {
            if (src) {
              return 60;
            }else{
              return 0;
            }
          })
          .attr("dy", function() {
            if (src) {
              return 70;
            }else{
              return 5;
            }
          })
          .style("text-anchor", "middle")
          .style("fill", "#fff")
          .style("font-size", "24px")
          .style("cursor", "pointer")
          .text(name);
        node.dx = x;
        node.dy = y;
        node.id = id;
        return node;
      },
      //创建连线
      setLine: function(nodeRoot, nodeA, nodeB) {
        var self=this;
        let space = 80;
        let tempR = this.currCircleR;
        var tempLinkId = "link_" + nodeA.id + "to" + nodeB.id;
        let link = nodeRoot
          .append("path")
          .attr("fill", "none")
          .attr("stroke-width", "2px")
          .attr("id", tempLinkId)
          .attr("d", function() {
            if (nodeB.dy - nodeA.dy - space > 0) {
              return self.getPathDownLink(nodeA, nodeB, space, tempR);
            } else if (nodeB.dx - nodeA.dx - space > 0) {
              return self.getPathRightLink(nodeA, nodeB, space, tempR);
            } else if (nodeB.dx - nodeA.dx + space < 0) {
              return self.getPathLeftLink(nodeA, nodeB, space, tempR);
            } else {
              return self.getPathUpLink(nodeA, nodeB, space, tempR);
            }
          })
          .attr("style", function() {
            return "stroke: rgb(132, 194, 147)";
          })
          .attr("marker-end", "url(#arrow)");
        return link;
      },
      //获取起点到终点 向下连线
      getPathDownLink: function(nodeA, nodeB, space, tempR) {
        return (
          "M" +
          nodeA.dx +
          " " +
          (nodeA.dy + tempR) +
          "L" +
          nodeA.dx +
          " " +
          (nodeA.dy + space) +
          "L" +
          nodeB.dx +
          " " +
          (nodeA.dy + space) +
          "L" +
          nodeB.dx +
          " " +
          (nodeB.dy - tempR)
        );
      },

      //获取起点到终点 向右侧连线
      getPathRightLink: function(nodeA, nodeB, space, tempR) {
        return (
          "M" +
          (nodeA.dx + tempR) +
          " " +
          nodeA.dy +
          "L" +
          (nodeA.dx + space) +
          " " +
          nodeA.dy +
          "L" +
          (nodeA.dx + space) +
          " " +
          nodeB.dy +
          "L" +
          (nodeB.dx - tempR) +
          " " +
          nodeB.dy
        );
      },

      //获取起点到终点 向左侧侧连线
      getPathLeftLink: function(nodeA, nodeB, space, tempR) {
        return (
          "M" +
          (nodeA.dx - tempR) +
          " " +
          nodeA.dy +
          "L" +
          (nodeA.dx - space) +
          " " +
          nodeA.dy +
          "L" +
          (nodeA.dx - space) +
          " " +
          nodeB.dy +
          "L" +
          (nodeB.dx + tempR) +
          " " +
          nodeB.dy
        );
      },

      //获取起点到终点 向上侧侧连线
      getPathUpLink: function(nodeA, nodeB, space, tempR) {
        return (
          "M" +
          nodeA.dx +
          " " +
          (nodeA.dy + tempR) +
          "L" +
          nodeA.dx +
          " " +
          (nodeA.dy + space) +
          "L" +
          nodeB.dx +
          " " +
          (nodeA.dy + space) +
          "L" +
          nodeB.dx +
          " " +
          (nodeB.dy + tempR)
        );
      },
      //获取节点数据
      getDataTestByNode: function() {
        var self=this;
        var tempNodeList = [];
        //获取业务数据
        var param = {
          "type": "select",
          "id": "ln_Operations_topo_node",
          "parameter": {}
        };
      },
      //获取连线数据
      getDataTestByLink: function(tempNodeList) {
        
      },

      //SVG背景单击事件
      svgBackGroundClick: function() {
        if(!this.toNext){
          this.index++;
        }
        this.toNext=false;
        this.cardInfo.show = false;
        clearInterval(this.timer);
        clearInterval(this.timer0);
        this.setTimerShowUi();
      },

      //svg节点单击事件
      svgNodeClick: function(e,d) {
        e.stopPropagation();
        var self=this;
        self.toNext=true;
        clearInterval(self.timer);
        clearInterval(self.timer0);
        self.alarmInfoList = [];
        self.alarmInfo=[];
        this.cardInfo.show = false;
        self.findAlarmInfo(d.id,function(res){
          this.cardInfo.show = true;
          this.cardInfo.top = d.dy;
          this.cardInfo.left = d.dx;
          if(res&&res.length>0){
            this.alarmInfoList = res;
            var j = 0;
            this.timer0 = setInterval(function () {
              self.alarmInfo.push(res[j]);
              j++;
              if (j >= res.length) {
                clearInterval(self.timer0);
              }
            }, 3000);
          }else{
            this.alarmInfo=[{value:"未找到相关数据！"}];
          }
        }.bind(this));
      },

      dragStart: function(d, i, a) {},

      dragEnd: function(d, i, a) {},

      dragDrag: function(d, i, a) {
        var d3 = this.$d3;
        var nodeId = a[0].getAttribute("id");
        var currNode = this.curNodeSourceList.find(function(item) {
          if ("node_"+item.nodID === nodeId.toString()) {
            return item;
          }
          return null;
        });
        if (currNode) {
          //var x = event.clientX - d3.event.sourceEvent.offsetX; // 记录当前盒子的x 位置
          //var y = event.clientY - d3.event.sourceEvent.offsetY; //  // 记录当前盒子的y位置
          currNode.dx = Number(d3.event.x);
          currNode.dy = Number(d3.event.y);
        }
        this.drawChartByDrag();
      },

      drawChartByDrag: function() {
        var d3 = this.$d3;
        d3.select("svg").remove();
        this.drawChart();
      },

      //排查各节点、连线是否告警
      setTimerShowUi: function() {
        var self=this;
        this.timer=setInterval(function() {
          var item=self.tempLinkList[self.index];
          var nodeId = "node_" + item.endnode;
          var lineId = "link_" + item.starNode + "to" + item.endnode;

          var tempNode = document.querySelector("#"+nodeId);
          var tempLine = document.querySelector("#"+lineId);

          var lastCircle = document.querySelector(".node-circle-doing");
          if(lastCircle){
            lastCircle.classList.value="";
          }
          if (tempNode) {
            tempNode.firstChild.classList.value="node-circle-doing";
          }

          self.hoverG.select("path").remove();
          if(tempLine.attributes){
            var path=tempLine.attributes.d.value.toString();
            self.hoverG.append("path")
              .attr("id", 'link_007')
              .attr("class", "link--doing")
              .attr("d",path)
              .attr("stroke-width", "4px")
              .attr("style", function() {
                return "stroke: rgb(132, 194, 147)";
              });
          }
          self.findAlarmInfo(item.endnode,function(res){
            if(res&&res.length>0){
              clearInterval(self.timer);
              self.alarmInfoList=res;
              self.alarmInfo=[];
              if (tempNode) {
                var tempRect = tempNode.attributes[1].value.substring(9);
                var arr=tempRect.substring(1,tempRect.length-1).split(',');
                self.cardInfo.show = true;
                if (self.cardInfo.show == true) {
                  self.cardInfo.top = Number(arr[1]);
                  self.cardInfo.left = Number(arr[0]);
                }
                var j=0;
                self.timer0=setInterval(function(){
                  self.alarmInfo.push(res[j]);
                  j++;
                  if(j>=res.length){
                    clearInterval(self.timer0);
                  }
                },3000);
              }
            }else{
              self.index++;
            }
          }.bind(this));
        }, 3000);
      },
      //获取排查顺序
      filterNodeLine:function(){
        var self=this;
        var param = {
          "type": "select",
          "id": "ln_Operations_topo_run",
          "parameter": {}
        };
      },

      //获取节点告警信息
      findAlarmInfo:function(nodeid,callback){
        var list=[];
        var param = {
          "type": "select",
          "id": "ln_Operations_topo_data",
          "parameter": {
            nodeid:nodeid
          }
        };
        getDataBaseInfo(param).then(function(data) {
          if (data) {
            data.forEach(function (item) {
              var obj = {
                id:item.NODEID,
                name: item.DADANAME,
                value: item.DADAVALUE,
                time:item.TIME
              };
              list.push(obj);
            });
          }
          callback(list);
        });
      }

    },
  });
});
</script>

<style>
  @keyframes regionLineAnimation {
    0% {
      stroke-dashoffset: 100;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes fade {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.5;
    }
    to {
      opacity: 1.0;
    }
  }
  @keyframes bounce {
    0% {
      /*stroke: #C63500;*/
      /*stroke-width: 0;*/
      fill: #C63500;
      /*transform: scale(0.8);*/
    }
    50% {
      /*stroke: #D91C12;*/
      /*stroke-width: 0.2em;*/
      fill: transparent;
      /*transform: scale(1.1);*/
    }
    to {
      /*stroke: #C63500;*/
      /*stroke-width: 0;*/
      fill: #C63500;
      /*transform: scale(0.8);*/
    }
  }
  .ln-mobile-alarm{
    width:100%;
    height:100%;
    background: #000829;
    position: relative;
  }

  .link--doing {
    fill: none;
    stroke: red !important;
    stroke-miterlimit: 10;
    stroke-dasharray: 8, 8;
    stroke-dashoffset: 100;
    animation:regionLineAnimation 4s linear forwards infinite;
  }
  .node {
    width: 53px;
    height: 53px;
  }
  .node-circle-doing {
    animation: bounce 2s ease-in-out infinite;
  }

  .cardInfo {
    width: 600px;
    height: 300px;
    position: absolute;
    font-family:Microsoft YaHei;
    font-size: 24px;
    background-color: transparent;
    border:1px solid #023DCB;
    color: #fff;
    z-index: 10;
  }
  .cardInfo>div{
    width:100%;
    height:100%;
    display:flex;
  }
  .cardInfo>div>div{
    height:calc(100% - 20px);
    padding:10px;
    display:flex;
    flex-direction: column;
  }
  .cardInfo>div>div:nth-of-type(1){
    width:30%;
    justify-content: space-between;
    align-items: center;
    background: #020C33;
  }
  .cardInfo>div>div:nth-of-type(1)>div:nth-last-of-type(1)>div:nth-last-of-type(1){display:none;}
  .cardInfo>div>div:nth-of-type(1) img{
    width:24px;
    height:24px;
    position: relative;
    top:10px;
  }
  .cardInfo>div>div:nth-of-type(1)>div>div{
    text-align:center;
  }
  .cardInfo>div>div:nth-of-type(1)>div:nth-of-type(1),.cardInfo>div>div:nth-of-type(1)>div:nth-of-type(2){
    color:#38FF33;
  }
  .cardInfo>div>div:nth-of-type(1)>div:nth-of-type(3),.cardInfo>div>div:nth-of-type(1)>div:nth-of-type(4){
    color:#00F6FF;
  }
  .cardInfo>div>div:nth-of-type(2){
    width:70%;
    background:rgba(7,27,115,0.6);
  }
  .cardInfo>div>div:nth-of-type(2)>div>div{
    height: 40px;
  }
</style>