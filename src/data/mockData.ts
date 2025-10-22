import { TVStation } from '../types';

export const mockStations: TVStation[] = [
  {
    id: "station-1",
    name: "フジテレビ",
    programs: [
      {
        id: "prog-1",
        name: "バラエティ番組A",
        genre: "レギュラー",
        episodes: [
          {
            id: "ep-0909",
            title: "第1回",
            date: "2025-09-09",
            time: "21:00-21:54",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 9/8",
                    detail: "2025-09-08 / 参加者: P, D, AD",
                    actionLabel: "開く",
                  },
                  {
                    title: "演出レビュー 9/5",
                    detail: "2025-09-05 / 参加者: D, AD",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [
                  {
                    title: "人気商店街の来客数データ (背景・市場動向・示唆)",
                    detail: "9/7/2025",
                    links: [
                      { label: "2025年Q4 商店街マーケットレポート", href: "#" },
                      { label: "商店街振興組合 交通量センター統計", href: "#" },
                    ],
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [
                  {
                    title: "構成案V1 (街歩き×発酵スイーツ・充実版)",
                    detail: "企画担当: 若野タケル",
                    actionLabel: "開く",
                  },
                ],
              },
            ],
          },
          {
            id: "ep-0916",
            title: "第2回",
            date: "2025-09-16",
            time: "21:00-21:54",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 9/15",
                    detail: "2025-09-15 / 参加者: P, D, AD",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "station-2",
    name: "NHK総合",
    programs: [
      {
        id: "prog-2",
        name: "ドキュメンタリーNEXT",
        genre: "特番",
        episodes: [
          {
            id: "ep-1005",
            title: "第1回",
            date: "2025-10-05",
            time: "19:30-20:45",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [
                  {
                    title: "企画会議 10/3",
                    detail: "2025-10-03 / 参加者: P, D",
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [
                  {
                    title: "AIと人間の協働事例調査",
                    detail: "10/2/2025",
                    links: [
                      { label: "世界のものづくり現場レポート", href: "#" },
                    ],
                    actionLabel: "開く",
                  },
                ],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [
                  {
                    title: "ドキュメンタリー構成案",
                    detail: "企画担当: 山田太郎",
                    actionLabel: "開く",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "station-3",
    name: "日本テレビ",
    programs: [
      {
        id: "prog-3",
        name: "朝の情報マルシェ",
        genre: "レギュラー",
        episodes: [
          {
            id: "ep-1010",
            title: "第1回",
            date: "2025-10-10",
            time: "07:00-08:00",
            sections: [
              {
                id: "minutes",
                title: "議事録",
                description: "最新の企画会議のメモや決定事項をまとめています。",
                addLabel: "議事録を追加",
                placeholder: "フリーワード",
                secondaryPlaceholder: "会議日 (yyyy-mm-dd)",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "research",
                title: "リサーチ",
                description: "番組撮影に向けた調査結果を集約しています。",
                addLabel: "リサーチを追加",
                placeholder: "キーワード",
                ctaLabel: "検索",
                items: [],
              },
              {
                id: "materials",
                title: "構成資料",
                description: "台本や取材メモ、撮影素材など制作に必要な資料を管理します。",
                addLabel: "構成資料を追加",
                placeholder: "ファイル名・メモ",
                ctaLabel: "検索",
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
