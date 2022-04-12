<template>
  <div>
    <navigation>
      <div class="nav">
        <router-link to="index">首页</router-link>
      </div>
    </navigation>

    <div class="wrapper mt20">
      <h2 class="mb20">职业价值观测试题</h2>
      <dl>
        <dt>测试前须知</dt>
        <dl>1、参加测试的人员请务必诚实、独立地回答问题，只有如此才能得到有效的结果。 </dl>
        <dl>2、《职业价值观测试》展示的是你的职业期望，而不是你的知识、技能、经验。 </dl>
        <dl>3、该测试题提供的价值观类型描述仅供测试者确定自己的类型之用，价值观类型没有好坏，只有不同。</dl>
        <dl>4、本测试共52题；需时约15分钟，每题有5个备选项，所有题目没有对错之分，请根据自己的实际情况选择。</dl>
      </dl>
      <div>只要你是认真、真实地填写了测试问卷，那么通常情况下你都能得到一个确实和你的职业价值观相匹配的类型。希望你能从中或多或少地获得一些有益的信息。</div>
      <div>请注意：下面有52道题目，每个题目有5个备选答案，请根据自己对工作的期望或想法，在题目后面填出相应数字，每题只能选一个答案。 </div>
      <div>A:非常重要; B:比较重要; C:一般; D:较不重要; E:很不重要 </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="subject" label="题目"></el-table-column>
        <el-table-column label="选项" width="380">
          <template slot-scope="scope">
            <el-radio v-for="(option, optionIndex) in scope.row.option" :key="optionIndex" v-model="scope.row.answer" :label="5 - optionIndex">{{ option }} </el-radio>
          </template>
        </el-table-column>
      </el-table>

      <div class="mtb20 tc">
        <el-button type="primary" @click="handlerSumimt">提交</el-button>
        <el-button @click="handlerReset">重做</el-button>
      </div>

      <el-dialog title="评估结果" :visible.sync="dialogVisible" width="50%">
        <div class="mtb20">总得分： {{ result }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { occupationalValues } from '../../data'
export default {
  data() {
    return {
      list: occupationalValues,
      result: '',
      dialogVisible: false
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    init() {
      this.list.forEach(item => {
        item.answer = 0
      })
    },
    handlerSumimt() {
      let result = 0
      for (let i = 0, l = this.list.length; i < l; i++) {
        const item = this.list[i]
        const value = item.answer
        if (!value) {
          return this.$message({
            message: `请选择第${i + 1}题答案！`,
            type: 'warning'
          })
        } else {
          result += parseInt(value)
        }
      }
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.submitResult(result)
        })
        .catch(() => {
          return
        })
    },
    handlerReset() {
      this.list.forEach(item => {
        item.answer = 0
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

<style>
</style>
