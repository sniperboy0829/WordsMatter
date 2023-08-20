function getRandomInt(max) {
  return Math.floor(Math.random() * max);  
}

export const getRandomIndexes = (length, n = length) => {
  let indexes = [];
  n = Math.min(length, n)
  for(let i = 0; i < n; i++) {
    let randomIndex = getRandomInt(length);
    if(indexes.indexOf(randomIndex) === -1) {
      indexes.push(randomIndex);
    } else {
      i--;
    }
  }
  return indexes;
}

export const getDictLibs = () => {
  const libs = [
    {
      id: 'cet4',
      name: 'CET-4',
      description: '大学英语四级词库',
      category: '中国考试',
      tags: ['大学英语'],
      url: '/dicts/CET4_T.json',
      length: 2607,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'cet6',
      name: 'CET-6',
      description: '大学英语六级词库',
      category: '中国考试',
      tags: ['大学英语'],
      url: '/dicts/CET6_T.json',
      length: 2345,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'gaokao3500',
      name: '高考 3500 词',
      description: '高考常见词 3500',
      category: '青少年英语',
      tags: ['通用'],
      url: '/dicts/GaoKao_3500.json',
      length: 3893,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'zhongkaohexin',
      name: '中考核心词',
      description: '中考核心词',
      category: '青少年英语',
      tags: ['通用'],
      url: '/dicts/ZhongKaoHeXin.json',
      length: 2140,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'itVocabulary',
      name: '计算机专用英语',
      description: '大学计算机专业英语词汇',
      category: '中国考试',
      tags: ['专业英语'],
      url: '/dicts/itVocabulary.json',
      length: 1665,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'nce1',
      name: '新概念英语-1',
      description: '新概念英语第一册',
      category: '青少年英语',
      tags: ['新概念英语'],
      url: '/dicts/NCE_1.json',
      length: 900,
      language: 'en',
      languageCategory: 'en',
    },
    {
      id: 'archVocabulary',
      name: '建筑专业英语',
      description: '大学建筑专业英语词汇',
      category: '中国考试',
      tags: ['专业英语'],
      url: '/dicts/archVocabulary.json',
      length: 630,
      language: 'en',
      languageCategory: 'en',
    },
  ];
  return libs;
}

export const getDifficultyLevel = () => {
  const levels = [
    {
      id: 0,
      name: "简单",
    },
    {
      id: 1,
      name: "中等",
    },
    {
      id: 2,
      name: "困难",
    }
  ];
  return levels;
}
