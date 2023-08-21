import { cet4 } from './cet4';
// import { cet6 } from './cet6';
import { gaokao3500 } from './gaokao3500.js';
import { zhongkaohexin } from './zhongkaohexin.js';
import { itVocabulary } from './itVocabulary.js';
import { nce1 } from './nce1.js';

const app = getApp();

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
      id: 'gaokao3500',
      name: '高考常见词',
      description: '高考常见词 3500',
      category: '青少年英语',
      tags: ['通用'],
      url: '/dicts/GaoKao_3500.json',
      length: 1668,
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
    }
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

export const getDict = (id) => {
  if (id === 'cet4') {
    return cet4;
  } else if (id === 'gaokao3500') {
    return gaokao3500;
  } else if (id === 'zhongkaohexin') {
    return zhongkaohexin;
  } else if (id === 'itVocabulary') {
    return itVocabulary;
  } else if (id === 'nce1') {
    return nce1;
  }
  return cet4;
}