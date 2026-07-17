# Nearby / 生生 — Product Architecture v1.1

> 定稿时间：2026-07
> 状态：Architecture Lock · 后续所有开发以此为准

***

# Nearby

Nearby is not a diary.

It is a place where today waits for the future.

Every memory leaves three traces.

One connects.
One grows.
One waits for the future.

These are the three worlds of Nearby:

- **Thread**
- **Grow**
- **Spark**

Everything in Nearby belongs to one of them.

***

---

## 零、产品定义

**Nearby 不是日记。Nearby 是把今天留给未来。**

> Every memory leaves three traces.
> One connects.
> One grows.
> One waits for the future.

每一段记忆，都会留下三种痕迹。
一条线。一株生长。一束等待未来的光。

---

## 零·一、三个世界（Three Worlds）

Nearby 以后只有三个世界。
不是三个页面。不是三个功能。而是三个世界。

### World 01 · Thread

**关键词**：Connection

**回答**：这段记忆，会和哪段记忆相遇？

**负责**：Timeline、Memory Weave、时间连接、连续记录、过去与今天之间的关系

**视觉载体**：线、节点、织线动画、stroke-dasharray

---

### World 02 · Grow

**关键词**：Growth

**回答**：这些记忆，让我变成了什么？

**负责**：生生、植物系统、Seed→Sprout→Leaf→Tree→Forest、长期成长反馈

**视觉载体**：种子、叶片、植物、绿色系 `#9AA889`

---

### World 03 · Spark

**关键词**：Time

**回答**：这一刻，有没有被时间记住？

**负责**：保存仪式（First Light）、星火暗示、星火计数、未来 Constellation（Ch 10）

**视觉载体**：星火 Star SVG `#D4A373` / `#E8C170`——全产品唯一金色

> Spark 不是页面。它是一层视觉语言。
> Constellation 是 Spark 世界的最终章。目前不开发。

---

## 零·二、新增功能判定规则

以后新增任何功能，不要先问"放在哪个页面"。
先问：**它属于哪一个世界？**

| 属于 | → 放在 |
|---|---|
| Thread | Timeline / Memory Weave |
| Grow | 生生 / Garden |
| Spark | Create 仪式 / Today 暗示 / 未来 Constellation |

如果无法归入三个世界之一 → **不做**。

---

## 一、核心模块（6 个）

```
┌─────────────────────────────────────────────────┐
│                   Nearby / 生生                    │
├───────────┬──────────┬──────────┬────────┬──────┤
│  Landing  │  Today   │  Create  │ 织线    │ 生生  │
│     /     │  /today  │  /create │/timeline│/garden│
├───────────┴──────────┴──────────┴────────┴──────┤
│                   About  /about                  │
└─────────────────────────────────────────────────┘
```

### 1. Landing `/`

**唯一职责**：介绍 Nearby，引导用户留下今天。

- 品牌：Nearby / Memory Weave / 生生
- 主标题：今日有痕。
- CTA：留住今天
- Living Memory Card（随机语录）
- Thread 呼吸动画
- 底部导航（inline）

**不承担**：数据总览、Garden 展示、Timeline 展示、Constellation 展示

---

### 2. Today `/today`

**唯一职责**：展示今天已经留下的内容。

- 日期、文字、图片、地点、心情
- Today Thread
- 星火暗示（首次从 Create 跳转时出现一次）
- 双击释放记忆（Desktop Memory Delete）

**不承担**：编辑、创建、历史浏览

---

### 3. Create `/create`

**唯一职责**：完成一次「留住今天」。

流程：
```
文字 → 图片 → 地点 → 心情 → 织成 Today Thread
                                ↓
                         First Light 仪式
                      （星火从按钮向上飞升）
                                ↓
                           跳转 Today
```

- Memory Weave 卡片（底部，显示节点和星数）
- 片段式编织交互（Thread / Image / Emotion / Place）
- 星火频率（1-2次 100%，3次 80%，4次 70%，5次 100%，之后 ~50%）

**不承担**：Timeline、Garden 成长结果、Constellation

---

### 4. 织线 `/timeline`

**唯一职责**：让用户回看记忆沿时间连接。

- 时间节点 + Thread 线
- 节点 hover：颜色变化 + 线延伸
- 展开/收起卡片
- 双击释放记忆
- 记忆之间的初步关系

**不承担**：普通列表样式、日历视图

---

### 5. 生生 `/garden`

**唯一职责**：表达「记忆正在生长」。

- 植物系统：Seed → Sprout → Leaf → Tree → Forest
- 记录天数、数量对生长的影响
- 长期成长反馈
- 白天形态

**不承担**：星空、黑夜模式、Constellation

---

### 6. About `/about`

**唯一职责**：解释产品理念。

- 自动播放四幕（生生 → 核心语句 → 四卡片 → 结束语）
- 3 秒/帧，无限循环

**不承担**：功能列表、Roadmap、开发文档

---

## 二、二级模块（不进入主导航）

| 模块 | 路由 | 职责 | 状态 |
|---|---|---|---|
| Place | `/place` | 聚合地点记忆 | 保留路由，不扩张 |
| Upload | `/upload` | 上传流程 | 流程页 |
| Result | `/result` | 结果页 | 流程页 |
| Generating | `/generating` | 生成中 | 流程页 |
| Mobile | `/mobile/*` | 移动端体验 | 独立，不动 |

---

## 三、Spark（星火）在整个体系中的位置

```
                    ┌──────────────────┐
                    │  Spark (星火)     │
                    │                  │
                    │  不是页面         │
                    │  不是模块         │
                    │  是视觉语言层      │
                    └──────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Create            Today           Timeline
   保存仪式：          首次访问：        节点 hover：
  星火从按钮          卡片右上角        Thread 延伸
  向上飞升           出现星火暗示       + 颜色变化
          │                │                │
          └────────────────┼────────────────┘
                           │
                    sessionStorage
                     star-count
                           │
                           ▼
                 ┌─────────────────┐
                 │ Ch 10 (未来)     │
                 │ Memory           │
                 │ Constellation    │
                 │ 记忆星座          │
                 └─────────────────┘
```

- Star 不是 Garden 的一部分
- Star 不进入当前主导航
- Star 数据通过 sessionStorage 追踪，为未来 Constellation 预留接口
- **全产品唯一金色 `#D4A373` / `#E8C170` 仅用于 Spark**

---

## 四、三个世界的关系

```
    Thread              Grow               Spark
    (连接)             (生命)             (时间)
       │                  │                  │
   织线动画            植物系统           星火/星芒
   Timeline            Garden             Create 仪式
   节点延伸            Seed→Forest        Today 暗示
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                    共享记忆数据
                 (localStorage entries)
```

规则：
- 三者并存，不互相抢夺
- Create 保存：Thread + Spark
- Timeline Hover：Thread
- Today 新记忆：Spark
- Garden：Grow
- Spark 永远保持最克制

---

## 五、交互语言

| 交互 | 规则 |
|---|---|
| 单击 | 展开/选择 |
| 双击 | 释放记忆（Desktop Memory Delete） |
| Hover | Thread 延伸 / 节点响应 / 星火微亮 |
| 保存 | Thread 生长 + Star 飞升（无 Toast） |
| 删除 | 纸片确认 + 线上缩 + 卡片消失 + 6s Undo |

全产品禁止：垃圾桶 icon、红色、alert/confirm、右键菜单、长按删除

---

## 六、明确定义的「不做」

### 本轮不做

- Memory Constellation 页面
- 星空 / 黑夜模式 / 黑色背景
- AI 分析 / AI 报告
- 地图 / Atlas
- 成就系统 / 解锁弹窗 / 等级 / 积分
- 社交 / 分享 / 账号系统
- 通知 / 提醒
- 暗色模式

### 推迟到 Ch 6-10

| Chapter | 名称 | 职责 |
|---|---|---|
| Ch 06 | Memory Discovery | 记忆发现：去年今日、随机浮现 |
| Ch 07 | Memory Echo | 记忆回响：重复模式发现 |
| Ch 08 | Garden 完善 | 四季、地点植物、情绪色彩 |
| Ch 09 | Memory Connections | 关系层：时间/地点/情绪连接 |
| Ch 10 | Memory Constellation | 最终章：星图系统，渐进解锁 |

---

## 七、导航架构（锁定）

```
桌面端主导航（MemoryNav）：

  今日         创建         织线         生生
  Today       Create       Thread       Garden
   /today      /create     /timeline     /garden
```

- Landing 使用 inline 导航（文档流）
- 其他页面使用 fixed 导航（底部胶囊）
- Place / About 不进入导航
- Constellation / Discovery 未来不进入主导航

---

## 八、数据层

```
localStorage
  └── nearby_entries: DiaryEntry[]     ← 记忆数据（持久）

sessionStorage
  ├── nearby-star-count: number        ← 星火计数（会话）
  └── nearby-new-memory-starlight: '1' ← 星火暗示标记（一次性）
```

---

## 九、设计铁律

| 规则 | 值 |
|---|---|
| 背景 | `#F7F6F3` 米白纸张 |
| 主文字 | `#1E1E1E` 墨色 |
| 辅助文字 | `#8C8C8C` / `#B0B0B0` |
| 唯一金色 | `#D4A373` → `#E8C170` — 仅用于 Star |
| 植物绿 | `#9AA889` / `#88A97A` |
| 品牌名 | 生生 / Nearby |
| 手绘资产 | Editorial Stroke 风格 |
| 动画语言 | Thread (线) + Spark (星) — 仅两套 |
| 无 Tailwind | 全部 inline style |
| 无 emoji 星 | 全部手绘 SVG |
