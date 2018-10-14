var titles = {
  cate1: '一、哪一个答案最能贴切的描绘你一般的感受或行为？',
  cate2: '二、在下列每一对词语中，哪一个词语更合你心意？请仔细想想这些词语的意义，而不要理会他们的字形或读音。',
  cate3: '三、哪一个答案最能贴切地描绘你一般的感受或行为',
  cate4: '四、在下列每一对词语中，哪一个词语更合你心意？'
}
var list1 = [{
  subject: '当你要外出一整天，你会 ',
  answer: '',
  option: [{ key: 'A', label: '计划你要做什么和在什么时候做，', value: 'J' }, { key: 'B', label: '说去就去', value: 'P' }]
}, {
  subject: '你认为自己是一个 ',
  answer: '',
  option: [{ key: 'A', label: '较为随兴所至的人，', value: 'P' }, { key: 'B', label: '较为有条理的人', value: 'J' }]
}, {
  subject: '假如你是一位老师，你会选教 ',
  answer: '',
  option: [{ key: 'A', label: '以事实为主的课程，', value: 'S' }, { key: 'B', label: '涉及理论的课程', value: 'N' }]
}, {
  subject: '你通常 ',
  answer: '',
  option: [{ key: 'A', label: '与人容易混熟，', value: 'E' }, { key: 'B', label: '比较沉静或矜持', value: 'I' }]
}, {
  subject: '一般来说，你和哪些人比较合得来？ ',
  answer: '',
  option: [{ key: 'A', label: '富于想象力的人，', value: 'N' }, { key: 'B', label: '现实的人', value: 'S' }]
}, {
  subject: '你是否经常让 ',
  answer: '',
  option: [{ key: 'A', label: '你的情感支配你的理智，', value: 'F' }, { key: 'B', label: '你的理智主宰你的情感', value: 'T' }]
}, {
  subject: '处理许多事情上，你会喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '凭兴所至行事，', value: 'P' }, { key: 'B', label: '按照计划行事', value: 'J' }]
}, {
  subject: '你是否 ',
  answer: '',
  option: [{ key: 'A', label: '容易让人了解', value: 'E' }, { key: 'B', label: '难于让人了解', value: 'I' }]
}, {
  subject: '按照程序表做事， ',
  answer: '',
  option: [{ key: 'A', label: '合你心意，', value: 'J' }, { key: 'B', label: '令你感到束缚', value: 'P' }]
}, {
  subject: '当你有一份特别的任务，你会喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '开始前小心组织计划，', value: 'J' }, { key: 'B', label: '边做边找须做什么', value: 'P' }]
}, {
  subject: '在大多数情况下，你会选择 ',
  answer: '',
  option: [{ key: 'A', label: '顺其自然，', value: 'E' }, { key: 'B', label: '按程序表做事', value: 'I' }]
}, {
  subject: '大多数人会说你是一个 ',
  answer: '',
  option: [{ key: 'A', label: '重视自我隐私的人，', value: 'E' }, { key: 'B', label: '非常坦率开放的人', value: 'I' }]
}, {
  subject: '你宁愿被人认为是一个 ',
  answer: '',
  option: [{ key: 'A', label: '实事求是的人，', value: 'E' }, { key: 'B', label: '机灵的人', value: 'I' }]
}, {
  subject: '在一大群人当中，通常是 ',
  answer: '',
  option: [{ key: 'A', label: '你介绍大家认识，', value: 'E' }, { key: 'B', label: '别人介绍你', value: 'I' }]
}, {
  subject: '你会跟哪些人做朋友？ ',
  answer: '',
  option: [{ key: 'A', label: '常提出新注意的，', value: 'E' }, { key: 'B', label: '脚踏实地的', value: 'I' }]
}, {
  subject: '你倾向 ',
  answer: '',
  option: [{ key: 'A', label: '重视感情多于逻辑，', value: 'E' }, { key: 'B', label: '重视逻辑多于感情', value: 'I' }]
}, {
  subject: '你比较喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '坐观事情发展才作计划，', value: 'E' }, { key: 'B', label: '很早就作计划', value: 'I' }]
}, {
  subject: '你喜欢花很多的时间 ',
  answer: '',
  option: [{ key: 'A', label: '一个人独处，', value: 'E' }, { key: 'B', label: '合别人在一起', value: 'I' }]
}, {
  subject: '与很多人一起会 ',
  answer: '',
  option: [{ key: 'A', label: '令你活力培增，', value: 'E' }, { key: 'B', label: '常常令你心力憔悴', value: 'I' }]
}, {
  subject: '你比较喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '很早便把约会、社交聚集等事情安排妥当，', value: 'E' }, { key: 'B', label: '无拘无束，看当时有什么好玩就做什么', value: 'I' }]
}, {
  subject: '计划一个旅程时，你较喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '大部分的时间都是跟当天的感觉行事，', value: 'E' }, { key: 'B', label: '事先知道大部分的日子会做什么', value: 'I' }]
}, {
  subject: '在社交聚会中，你 ',
  answer: '',
  option: [{ key: 'A', label: '有时感到郁闷，', value: 'E' }, { key: 'B', label: '常常乐在其中', value: 'I' }]
}, {
  subject: '你通常 ',
  answer: '',
  option: [{ key: 'A', label: '和别人容易混熟，', value: 'E' }, { key: 'B', label: '趋向自处一隅', value: 'I' }]
}, {
  subject: '哪些人会更吸引你？ ',
  answer: '',
  option: [{ key: 'A', label: '一个思想敏捷及非常聪颖的人，', value: 'E' }, { key: 'B', label: '实事求是，具丰富常识的人', value: 'I' }]
}, {
  subject: '在日常工作中，你会 ',
  answer: '',
  option: [{ key: 'A', label: '颇为喜欢处理迫使你分秒必争的突发', value: 'E' }, { key: 'B', label: '通常预先计划，以免要在压力下工作', value: 'I' }]
}, {
  subject: '你认为别人一般 ',
  answer: '',
  option: [{ key: 'A', label: '要花很长时间才认识你，', value: 'E' }, { key: 'B', label: '用很短的时间便认识你', value: 'I' }]
}]
var list2 = [{
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '注重隐私', value: 'E' }, { key: 'B', label: '坦率开放', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '预先安排的', value: 'E' }, { key: 'B', label: '无计划的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '抽象', value: 'E' }, { key: 'B', label: '具体', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '温柔', value: 'E' }, { key: 'B', label: '坚定', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '思考', value: 'E' }, { key: 'B', label: '感受', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '事实', value: 'E' }, { key: 'B', label: '意念', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '冲动', value: 'E' }, { key: 'B', label: '决定', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '热衷', value: 'E' }, { key: 'B', label: '文静', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '文静', value: 'E' }, { key: 'B', label: '外向', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '有系统', value: 'E' }, { key: 'B', label: '随意', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '理论', value: 'E' }, { key: 'B', label: '肯定', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '敏感', value: 'E' }, { key: 'B', label: '公正', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '令人信服', value: 'E' }, { key: 'B', label: '感人的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '声明', value: 'E' }, { key: 'B', label: '概念', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '不受约束', value: 'E' }, { key: 'B', label: '预先安排', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '矜持', value: 'E' }, { key: 'B', label: '健谈', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '有条不紊', value: 'E' }, { key: 'B', label: '不拘小节', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '意念', value: 'E' }, { key: 'B', label: '实况', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '同情怜悯', value: 'E' }, { key: 'B', label: '远见', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '利益', value: 'E' }, { key: 'B', label: '祝福', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '务实的', value: 'E' }, { key: 'B', label: '理论的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '朋友不多', value: 'E' }, { key: 'B', label: '朋友众多', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '有系统', value: 'E' }, { key: 'B', label: '即兴', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '富想象的', value: 'E' }, { key: 'B', label: '以事论事', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '亲切的', value: 'E' }, { key: 'B', label: '客观的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '客观的', value: 'E' }, { key: 'B', label: '热情的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '建造', value: 'E' }, { key: 'B', label: '发明', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '文静', value: 'E' }, { key: 'B', label: '爱合群', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '理论', value: 'E' }, { key: 'B', label: '事实', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '富同情', value: 'E' }, { key: 'B', label: '合逻辑', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '具分析力', value: 'E' }, { key: 'B', label: '多愁善感', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '合情合理', value: 'E' }, { key: 'B', label: '令人着迷', value: 'I' }]
}]
var list3 = [{
  subject: '当你要在一个星期内完成一个大项目，你在开始的时候会 A',
  answer: '',
  option: [{ key: '把', label: '要做的不同工作依次列出', value: 'E' }, { key: 'B', label: '马上动工', value: 'I' }]
}, {
  subject: '在社交场合中，你经常会感到',
  answer: '',
  option: [{ key: 'A', label: '与某些人很难打开话匣儿和保持对话，或是', value: 'E' }, { key: 'B', label: '与多数人都能从容地长谈', value: 'I' }]
}, {
  subject: '要做许多人也做的事，你比较喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '按照一般认可的方法去做', value: 'E' }, { key: 'B', label: '构想一个自己的想法', value: 'I' }]
}, {
  subject: '你刚认识的朋友能否说出你的兴趣？ ',
  answer: '',
  option: [{ key: 'A', label: '马上可以', value: 'E' }, { key: 'B', label: '要待他们真正了解你之后才可以', value: 'I' }]
}, {
  subject: '你通常较喜欢的科目是 ',
  answer: '',
  option: [{ key: 'A', label: '讲授概念和原则的', value: 'E' }, { key: 'B', label: '讲授事实和数据的', value: 'I' }]
}, {
  subject: '哪个是较高的赞誉，或称许为？ ',
  answer: '',
  option: [{ key: 'A', label: '一贯感性的人', value: 'E' }, { key: 'B', label: '一贯理性的人', value: 'I' }]
}, {
  subject: '你认为按照程序表做事 ',
  answer: '',
  option: [{ key: 'A', label: '有时是需要的，但一般来说你不大喜欢这样做，或是', value: 'E' }, { key: 'B', label: '大多数情况下是有帮助而且是你喜欢做的', value: 'I' }]
}, {
  subject: '和一群人在一起，你通常会选 ',
  answer: '',
  option: [{ key: 'A', label: '跟你很熟悉的个别人谈话', value: 'E' }, { key: 'B', label: '参与大伙的谈话', value: 'I' }]
}, {
  subject: '在社交聚会上，你会 ',
  answer: '',
  option: [{ key: 'A', label: '是说话很多的一个', value: 'E' }, { key: 'B', label: '让别人多说话', value: 'I' }]
}, {
  subject: '把周末期间要完成的事列成清单，这个主意会 ',
  answer: '',
  option: [{ key: 'A', label: '合你意', value: 'E' }, { key: 'B', label: '使你提不起劲', value: 'I' }]
}, {
  subject: '哪个是较高的赞誉，或称许为 ',
  answer: '',
  option: [{ key: 'A', label: '能干的', value: 'E' }, { key: 'B', label: '富有同情心', value: 'I' }]
}, {
  subject: '你通常喜欢 ',
  answer: '',
  option: [{ key: 'A', label: '事先安排你的社交约会', value: 'E' }, { key: 'B', label: '随兴之所至做事', value: 'I' }]
}, {
  subject: '总的说来，要做一个大型作业时，你会选 ',
  answer: '',
  option: [{ key: 'A', label: '边做边想该做什么', value: 'E' }, { key: 'B', label: '首先把工作按步细分', value: 'I' }]
}, {
  subject: '你能否滔滔不绝地与人聊天 ',
  answer: '',
  option: [{ key: 'A', label: '只限于跟你有共同兴趣的人', value: 'E' }, { key: 'B', label: '几乎跟任何人都可以', value: 'I' }]
}, {
  subject: '你会 ',
  answer: '',
  option: [{ key: 'A', label: '跟随一些证明有效的方法，或是', value: 'E' }, { key: 'B', label: '分析还有什么毛病，及针对尚未解决的难题', value: 'I' }]
}, {
  subject: '为乐趣而阅读时，你会 ',
  answer: '',
  option: [{ key: 'A', label: '喜欢奇特或创新的表达方式', value: 'E' }, { key: 'B', label: '喜欢作者直话直说', value: 'I' }]
}, {
  subject: '你宁愿替哪一类上司（或者老师）工作？ ',
  answer: '',
  option: [{ key: 'A', label: '天性淳良，但常常前后不一的', value: 'E' }, { key: 'B', label: '言词尖锐但永远合乎逻辑的', value: 'I' }]
}, {
  subject: '你做事多数是 ',
  answer: '',
  option: [{ key: 'A', label: '按当天心情去做', value: 'E' }, { key: 'B', label: '照拟好的程序表去做', value: 'I' }]
}, {
  subject: '你是否 ',
  answer: '',
  option: [{ key: 'A', label: '可以和任何人按需求从容地交谈，或是', value: 'E' }, { key: 'B', label: '只是对某些人或在某种情况下才可以畅所欲言', value: 'I' }]
}, {
  subject: '要作决定时，你认为比较重要的是 ',
  answer: '',
  option: [{ key: 'A', label: '据事实衡量', value: 'E' }, { key: 'B', label: '考虑他人的感受和意见', value: 'I' }]
}]
var list4 = [{
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '想象的', value: 'E' }, { key: 'B', label: '真实的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '仁慈慷慨的', value: 'E' }, { key: 'B', label: '意志坚定的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '公正的', value: 'E' }, { key: 'B', label: '有关怀心', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '制作', value: 'E' }, { key: 'B', label: '设计', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '可能性', value: 'E' }, { key: 'B', label: '必然性', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '温柔', value: 'E' }, { key: 'B', label: '力量', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '实际', value: 'E' }, { key: 'B', label: '多愁善感', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '制造', value: 'E' }, { key: 'B', label: '创造', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '新颖的', value: 'E' }, { key: 'B', label: '已知的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '同情', value: 'E' }, { key: 'B', label: '分析', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '坚持己见', value: 'E' }, { key: 'B', label: '温柔有爱心', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '具体的', value: 'E' }, { key: 'B', label: '抽象的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '全心投入', value: 'E' }, { key: 'B', label: '有决心的', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '能干', value: 'E' }, { key: 'B', label: '仁慈', value: 'I' }]
}, {
  subject: '',
  answer: '',
  option: [{ key: 'A', label: '实际', value: 'E' }, { key: 'B', label: '创新', value: 'I' }]
}]
export default {
  questionCategory: [{
    title: titles.cate1,
    list: list1
  }, {
    title: titles.cate2,
    list: list2
  }, {
    title: titles.cate3,
    list: list3
  }, {
    title: titles.cate4,
    list: list4
  }]
}
