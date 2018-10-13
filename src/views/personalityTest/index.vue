<template>
  <div class="wrapper">
    <h1>职业测评</h1>
    <div class="tc">
      <el-button type="primary" @click="handlerSumimt">提交</el-button>
      <el-button @click="handlerReset">重做</el-button>
    </div>
    <div v-for="(cate, cateIndex) in list" :key="cateIndex" class="mtb50">

      <h2>{{cate.title}}</h2>
      <el-table :data="cate.list" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="问题描述" width="450">
          <template slot-scope="scope">
            <div v-if="scope.row.subject">{{scope.row.subject}}</div>
            <div v-for="(option, optionIndex) in scope.row.option" :key="optionIndex">{{option.key}}: {{option.label}}</div>
          </template>
        </el-table-column>
        <el-table-column label="选项">
          <template slot-scope="scope">
            <el-radio v-for="(option, optionIndex) in scope.row.option" :key="optionIndex" v-model="scope.row.answer" :label="option.value">{{option.key}}</el-radio>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tc">
      <el-button type="primary" @click="handlerSumimt">提交</el-button>
      <el-button @click="handlerReset">重做</el-button>
    </div>

    <el-dialog title="评估结果" :visible.sync="dialogVisible" width="50%">
      <h3 class="mtb20">总分</h3>
      <div class="row">
        <el-row>
          <el-col :span="12">
            <el-col :span="8">E / {{typesMap.E}}</el-col>
            <el-col :span="14">{{result.E}}</el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="8">I / {{typesMap.I}}</el-col>
            <el-col :span="14">{{result.I}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="8">S / {{typesMap.S}}</el-col>
            <el-col :span="14">{{result.S}}</el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="8">N / {{typesMap.N}}</el-col>
            <el-col :span="14">{{result.N}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="8">T / {{typesMap.T}}</el-col>
            <el-col :span="14">{{result.T}}</el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="8">F / {{typesMap.F}}</el-col>
            <el-col :span="14">{{result.F}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="8">J / {{typesMap.J}}</el-col>
            <el-col :span="14">{{result.J}}</el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="8">P / {{typesMap.P}}</el-col>
            <el-col :span="14">{{result.P}}</el-col>
          </el-col>
        </el-row>
      </div>
      <h3 class="mtb20">评估类型</h3>
      <div class="row">
        <el-row>
          <el-col :span="6" v-for="(r, i) in finalResult" :key="i">{{r}}</el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    personalityData
  } from '@data'

  const typesMap = {
    E: '外向',
    I: '内向',
    S: '实感',
    N: '直觉',
    T: '思考',
    F: '情感',
    J: '判断',
    P: '认知'
  }
  const types = Object.keys(typesMap)
  // const compareList = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']]

  export default {
    data() {
      return {
        list: personalityData.questionCategory,
        // formatList: [], // 展开后的list
        types,
        typesMap,
        result: {},
        dialogVisible: false
      }
    },
    components: {},
    computed: {
      // 展开后的list
      formatList: function() {
        let list = []
        this.list.forEach(item => {
          list = list.concat(item.list)
        })
        return list
      },
      resultList: function() {
        let list = []
        for (const key in this.result) {
          if (this.result.hasOwnProperty(key)) {
            let item = {
              key: key,
              value: this.result[key]
            }
            list.push(item)
          }
        }
        return list
      },
      finalResult: function() {
        let list = []
        list.push(this.result.E >= this.result.I ? 'E/' + this.typesMap.E : 'I/' + this.typesMap.I)
        list.push(this.result.S >= this.result.N ? 'S/' + this.typesMap.S : 'N/' + this.typesMap.N)
        list.push(this.result.T >= this.result.F ? 'T/' + this.typesMap.T : 'F/' + this.typesMap.F)
        list.push(this.result.J >= this.result.P ? 'J/' + this.typesMap.J : 'P/' + this.typesMap.P)
        return list
      }
    },
    watch: {},
    methods: {
      init() {
        // 缓存获取， 处理刷新数据丢失
      },
      handlerSumimt() {
        let result = {}
        types.forEach(k => {
          result[k] = 0
        })
        for (let i = 0, l = this.formatList.length; i < l; i++) {
          let item = this.formatList[i]
          let key = item.answer
          if (!key) {
            return this.$message({
              message: `请选择第${i + 1}题答案！`,
              type: 'warning'
            })
          } else {
            result[key]++
          }
        }
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitResult(result)
        }).catch(() => {})
      },
      handlerReset() {
        this.formatList.forEach(item => {
          item.answer = ''
        })
      },
      submitResult(result) {
        this.result = result
        this.dialogVisible = true
      }

    },
    created() {
      this.init()
    }
  }

</script>

<style lang="scss">
  .row {
    border: 1px solid #ebeef5;
  }

  .el-row {
    border-bottom: 1px solid #ebeef5;
    padding: 5px ;
    &:last-child{
      border-bottom: none;
    }
  }

  .el-col {}

</style>
