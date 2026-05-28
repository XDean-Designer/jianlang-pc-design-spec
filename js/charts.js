/**
 * 剑琅管家 · 数据可视化图表（ECharts 5）
 */
(function (global) {
  "use strict";

  const CHART_COLORS = {
    brand: "#F32F41",
    brandLight: "#FEF0F1",
    info: "#165DFF",
    infoLight: "#E8F3FF",
    success: "#00B42A",
    successLight: "#E8FFEA",
    warning: "#FF7D00",
    warningLight: "#FFF7E8",
    purple: "#722ED1",
    cyan: "#14C9C9",
    series: ["#F32F41", "#165DFF", "#14C9C9", "#00B42A", "#FF7D00", "#722ED1"],
    axis: "#86909C",
    split: "#E5E6EB",
    text: "#4E5969",
    textTitle: "#1D2129",
  };

  const CHART_PALETTE_ITEMS = [
    ["chart-brand", CHART_COLORS.brand, "主指标 / 营业额"],
    ["chart-info", CHART_COLORS.info, "对比 / 去年"],
    ["chart-cyan", CHART_COLORS.cyan, "客流 / 辅助"],
    ["chart-success", CHART_COLORS.success, "完成 / 增长"],
    ["chart-warning", CHART_COLORS.warning, "目标线 / 预警"],
    ["chart-purple", CHART_COLORS.purple, "类目扩展"],
  ];

  let period = 7;
  const instances = {};
  let resizeBound = false;

  function genDates(n) {
    const labels = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }
    return labels;
  }

  function genSeries(n, base, variance) {
    return Array.from({ length: n }, (_, i) => {
      const wave = Math.sin(i / 2) * variance;
      return Math.round(base + wave + (Math.random() - 0.5) * variance * 0.4);
    });
  }

  function baseGrid() {
    return {
      left: 48,
      right: 24,
      top: 48,
      bottom: 32,
      containLabel: true,
    };
  }

  function baseTooltip(trigger = "axis") {
    return {
      trigger,
      backgroundColor: "#FFFFFF",
      borderColor: CHART_COLORS.split,
      borderWidth: 1,
      padding: [10, 14],
      textStyle: { color: CHART_COLORS.text, fontSize: 13 },
      extraCssText: "box-shadow: 0 4px 10px rgba(0,0,0,0.08); border-radius: 4px;",
    };
  }

  function categoryAxis(data) {
    return {
      type: "category",
      data,
      axisLine: { lineStyle: { color: CHART_COLORS.split } },
      axisTick: { show: false },
      axisLabel: { color: CHART_COLORS.axis, fontSize: 12 },
    };
  }

  function valueAxis(name, opts = {}) {
    return {
      type: "value",
      name,
      nameTextStyle: { color: CHART_COLORS.axis, fontSize: 12 },
      splitLine: { lineStyle: { color: CHART_COLORS.split, type: "dashed" } },
      axisLabel: {
        color: CHART_COLORS.axis,
        fontSize: 12,
        formatter: opts.percent ? "{value}%" : undefined,
      },
      ...opts,
    };
  }

  function legend(data, bottom = 0) {
    return {
      data,
      bottom,
      icon: "roundRect",
      itemWidth: 12,
      itemHeight: 4,
      textStyle: { color: CHART_COLORS.text, fontSize: 12 },
    };
  }

  function initChart(id, option) {
    const el = document.getElementById(id);
    if (!el || !global.echarts) return null;
    const chart = global.echarts.init(el, null, { renderer: "canvas" });
    chart.setOption(option);
    instances[id] = chart;
    return chart;
  }

  function getPeriodData() {
    const n = period;
    const labels = genDates(n);
    const revenue = genSeries(n, period === 7 ? 42000 : period === 30 ? 38000 : 35000, 8000);
    const lastYear = revenue.map((v) => Math.round(v * (0.82 + Math.random() * 0.08)));
    return { labels, revenue, lastYear, n };
  }

  function buildLineOption() {
    const { labels, revenue, lastYear } = getPeriodData();
    return {
      color: [CHART_COLORS.brand, CHART_COLORS.info],
      grid: baseGrid(),
      tooltip: {
        ...baseTooltip(),
        formatter(params) {
          const rows = params
            .map(
              (p) =>
                `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>${p.seriesName}: <b>¥${Number(p.value).toLocaleString()}</b>`
            )
            .join("<br/>");
          return `<div style="font-weight:500;margin-bottom:6px;color:${CHART_COLORS.textTitle}">${params[0].axisValue}</div>${rows}`;
        },
      },
      legend: legend(["本期营业额", "去年同期"]),
      xAxis: categoryAxis(labels),
      yAxis: valueAxis("金额(元)"),
      series: [
        {
          name: "本期营业额",
          type: "line",
          smooth: false,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2 },
          data: revenue,
        },
        {
          name: "去年同期",
          type: "line",
          smooth: false,
          symbol: "emptyCircle",
          symbolSize: 6,
          lineStyle: { width: 2, type: "dashed" },
          data: lastYear,
        },
      ],
    };
  }

  function buildSmoothOption() {
    const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const flow = [12, 28, 45, 38, 22, 35, 48, 52, 61, 44, 30];
    return {
      color: [CHART_COLORS.info],
      grid: baseGrid(),
      tooltip: baseTooltip(),
      xAxis: categoryAxis(hours),
      yAxis: valueAxis("到店人次"),
      series: [
        {
          name: "客流",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 3 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(22,93,255,0.2)" },
                { offset: 1, color: "rgba(22,93,255,0.02)" },
              ],
            },
          },
          data: flow,
        },
      ],
    };
  }

  function buildBarOption() {
    const stores = ["旗舰店", "CBD店", "社区店", "二店", "三店"];
    const values = [186, 142, 98, 124, 88];
    return {
      color: [CHART_COLORS.brand],
      grid: { ...baseGrid(), left: 56 },
      tooltip: baseTooltip("axis"),
      xAxis: categoryAxis(stores),
      yAxis: valueAxis("万元"),
      series: [
        {
          name: "业绩",
          type: "bar",
          barWidth: 28,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          label: {
            show: true,
            position: "top",
            color: CHART_COLORS.text,
            fontSize: 11,
            formatter: "{c}",
          },
          data: values,
        },
      ],
    };
  }

  function buildStackBarOption() {
    const cats = ["洗护", "染烫", "护理", "美甲", "其他"];
    const s1 = [42, 38, 28, 22, 15];
    const s2 = [35, 45, 32, 18, 12];
    const s3 = [28, 22, 40, 25, 10];
    return {
      color: [CHART_COLORS.brand, CHART_COLORS.info, CHART_COLORS.cyan],
      grid: baseGrid(),
      tooltip: baseTooltip(),
      legend: legend(["美发", "美容", "套餐"]),
      xAxis: categoryAxis(cats),
      yAxis: valueAxis("占比(%)", { max: 100 }),
      series: [
        { name: "美发", type: "bar", stack: "total", barWidth: 32, data: s1 },
        { name: "美容", type: "bar", stack: "total", data: s2 },
        { name: "套餐", type: "bar", stack: "total", data: s3 },
      ],
    };
  }

  function buildAreaOption() {
    const { labels } = getPeriodData();
    const n = Math.min(labels.length, 14);
    const slice = labels.slice(-n);
    const members = genSeries(n, 1200, 80).map((v, i) => 800 + i * 40 + v);
    return {
      color: [CHART_COLORS.brand],
      grid: baseGrid(),
      tooltip: baseTooltip(),
      xAxis: categoryAxis(slice),
      yAxis: valueAxis("会员数"),
      series: [
        {
          name: "累计会员",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(243,47,65,0.25)" },
                { offset: 1, color: "rgba(243,47,65,0.02)" },
              ],
            },
          },
          data: members,
        },
      ],
    };
  }

  function buildMixOption() {
    const weeks = ["W1", "W2", "W3", "W4"];
    const actual = [82, 91, 88, 96];
    const target = [85, 90, 92, 95];
    return {
      color: [CHART_COLORS.brand, CHART_COLORS.warning],
      grid: baseGrid(),
      tooltip: baseTooltip(),
      legend: legend(["实收(万)", "目标(万)"]),
      xAxis: categoryAxis(weeks),
      yAxis: valueAxis("万元"),
      series: [
        {
          name: "实收(万)",
          type: "bar",
          barWidth: 36,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          data: actual,
        },
        {
          name: "目标(万)",
          type: "line",
          symbol: "diamond",
          symbolSize: 8,
          lineStyle: { width: 2, type: "dashed" },
          data: target,
        },
      ],
    };
  }

  function buildPieOption() {
    return {
      color: CHART_COLORS.series,
      tooltip: { ...baseTooltip("item"), formatter: "{b}: {c}% ({d}%)" },
      legend: {
        orient: "vertical",
        right: 16,
        top: "center",
        textStyle: { color: CHART_COLORS.text, fontSize: 12 },
      },
      series: [
        {
          name: "支付方式",
          type: "pie",
          radius: ["48%", "72%"],
          center: ["40%", "50%"],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: "#fff", borderWidth: 2 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 500 },
            scaleSize: 6,
          },
          data: [
            { value: 42, name: "微信" },
            { value: 28, name: "支付宝" },
            { value: 18, name: "会员卡" },
            { value: 8, name: "现金" },
            { value: 4, name: "其他" },
          ],
        },
      ],
    };
  }

  function buildGaugeOption() {
    return {
      series: [
        {
          type: "gauge",
          center: ["50%", "58%"],
          radius: "85%",
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 5,
          itemStyle: { color: CHART_COLORS.brand },
          progress: {
            show: true,
            width: 14,
            itemStyle: { color: CHART_COLORS.brand },
          },
          axisLine: {
            lineStyle: {
              width: 14,
              color: [[1, CHART_COLORS.split]],
            },
          },
          axisTick: { show: false },
          splitLine: { length: 8, lineStyle: { color: CHART_COLORS.split } },
          axisLabel: { color: CHART_COLORS.axis, distance: 20, fontSize: 11 },
          pointer: { width: 5, length: "55%" },
          anchor: { show: true, size: 10, itemStyle: { borderWidth: 2, borderColor: CHART_COLORS.brand } },
          title: { offsetCenter: [0, "78%"], fontSize: 13, color: CHART_COLORS.text },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, "28%"],
            fontSize: 28,
            fontWeight: 600,
            color: CHART_COLORS.textTitle,
            formatter: "{value}%",
          },
          data: [{ value: 86.4, name: "月度目标完成" }],
        },
      ],
    };
  }

  function buildRadarOption() {
    return {
      color: [CHART_COLORS.brand, CHART_COLORS.info],
      legend: legend(["本店", "行业均值"], 0),
      radar: {
        center: ["50%", "52%"],
        radius: "62%",
        indicator: [
          { name: "营业额", max: 100 },
          { name: "客单价", max: 100 },
          { name: "复购率", max: 100 },
          { name: "预约转化", max: 100 },
          { name: "满意度", max: 100 },
        ],
        axisName: { color: CHART_COLORS.text, fontSize: 12 },
        splitLine: { lineStyle: { color: CHART_COLORS.split } },
        splitArea: { areaStyle: { color: ["#fff", "#F7F8FA"] } },
        axisLine: { lineStyle: { color: CHART_COLORS.split } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              name: "本店",
              value: [88, 76, 82, 70, 91],
              areaStyle: { color: "rgba(243,47,65,0.15)" },
              lineStyle: { width: 2 },
            },
            {
              name: "行业均值",
              value: [72, 68, 65, 62, 78],
              lineStyle: { type: "dashed", width: 2 },
              areaStyle: { color: "rgba(22,93,255,0.08)" },
            },
          ],
        },
      ],
    };
  }

  function buildHBarOption() {
    const names = ["王丽", "李婷", "张敏", "陈静", "刘洋", "赵雪", "周芳", "吴磊"];
    const vals = [128, 116, 108, 98, 92, 86, 78, 72];
    return {
      color: [CHART_COLORS.brand],
      grid: { left: 72, right: 48, top: 16, bottom: 24, containLabel: true },
      tooltip: baseTooltip("axis"),
      xAxis: valueAxis("业绩(万)"),
      yAxis: {
        type: "category",
        data: names.reverse(),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: CHART_COLORS.text, fontSize: 12 },
      },
      series: [
        {
          type: "bar",
          barWidth: 16,
          itemStyle: { borderRadius: [0, 4, 4, 0] },
          data: vals.reverse(),
        },
      ],
    };
  }

  function buildHeatmapOption() {
    const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const hours = ["10", "12", "14", "16", "18", "20"];
    const data = [];
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < hours.length; j++) {
        const v = Math.round(10 + Math.random() * 40 + (i >= 5 ? 15 : 0) + (j >= 3 ? 10 : 0));
        data.push([j, i, v]);
      }
    }
    return {
      grid: { left: 56, right: 24, top: 24, bottom: 48 },
      tooltip: {
        position: "top",
        ...baseTooltip("item"),
        formatter(p) {
          return `${days[p.data[1]]} ${hours[p.data[0]]}:00<br/>预约量: <b>${p.data[2]}</b>`;
        },
      },
      xAxis: {
        type: "category",
        data: hours.map((h) => h + ":00"),
        splitArea: { show: true },
        axisLabel: { color: CHART_COLORS.axis, fontSize: 11 },
      },
      yAxis: {
        type: "category",
        data: days,
        splitArea: { show: true },
        axisLabel: { color: CHART_COLORS.axis, fontSize: 12 },
      },
      visualMap: {
        min: 0,
        max: 60,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        itemWidth: 12,
        itemHeight: 120,
        inRange: {
          color: ["#FFF2F2", "#FCBDC3", "#F97883", "#F32F41", "#D92939"],
        },
        textStyle: { color: CHART_COLORS.axis, fontSize: 11 },
      },
      series: [
        {
          type: "heatmap",
          data,
          label: { show: false },
          emphasis: { itemStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.12)" } },
        },
      ],
    };
  }

  function refreshPeriodCharts() {
    if (instances.chartLine) instances.chartLine.setOption(buildLineOption(), true);
    if (instances.chartArea) instances.chartArea.setOption(buildAreaOption(), true);
  }

  function renderChartPalette() {
    const box = document.getElementById("chartPalette");
    if (!box) return;
    box.innerHTML =
      '<span class="chart-palette__title">图表序列色 chart-1 ~ chart-6（点击复制）</span>' +
      CHART_PALETTE_ITEMS.map(
        ([name, hex, desc]) =>
          `<button type="button" class="chart-color-chip" data-hex="${hex}" style="--chip:${hex}" title="${desc}">
            <i></i><code>${hex}</code><span>${name}</span>
          </button>`
      ).join("");
    box.querySelectorAll(".chart-color-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hex = btn.dataset.hex;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(hex).then(() => {
            if (global.showChartToast) global.showChartToast("已复制 " + hex);
          });
        }
      });
    });
  }

  function bindPeriod() {
    document.querySelectorAll("#chartPeriod .chart-period__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#chartPeriod .chart-period__btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        period = +btn.dataset.period;
        refreshPeriodCharts();
      });
    });
  }

  function bindResize() {
    if (resizeBound) return;
    resizeBound = true;
    window.addEventListener("resize", () => {
      Object.values(instances).forEach((c) => c && c.resize());
    });
  }

  function initCharts() {
    if (!global.echarts) {
      console.warn("ECharts 未加载，图表组件跳过初始化");
      return;
    }
    renderChartPalette();
    bindPeriod();

    initChart("chartLine", buildLineOption());
    initChart("chartSmooth", buildSmoothOption());
    initChart("chartBar", buildBarOption());
    initChart("chartStackBar", buildStackBarOption());
    initChart("chartArea", buildAreaOption());
    initChart("chartMix", buildMixOption());
    initChart("chartPie", buildPieOption());
    initChart("chartGauge", buildGaugeOption());
    initChart("chartRadar", buildRadarOption());
    initChart("chartHBar", buildHBarOption());
    initChart("chartHeatmap", buildHeatmapOption());

    bindResize();

    const chartSection = document.getElementById("charts");
    if (chartSection && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              Object.values(instances).forEach((c) => c && c.resize());
            }
          });
        },
        { threshold: 0.1 }
      );
      obs.observe(chartSection);
    }
  }

  global.JianlangCharts = {
    init: initCharts,
    colors: CHART_COLORS,
    refreshPeriodCharts,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCharts);
  } else {
    initCharts();
  }
})(window);
