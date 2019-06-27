<template>
  <div class="machine">
    <div class="machineData-wrap">
      <drop-item class="machine-item" title="国家"></drop-item>
<!--      <drop-item class="machine-item" title="Image" :dropList="images"></drop-item>-->
      <drop-item class="machine-item" title="机器状态" :dropList="machineTypes"></drop-item>
      <slide-item class="machine-item" title="累计使用时长">1h 51min</slide-item>
      <slide-item class="machine-item" title="历史可靠性">20%</slide-item>
      <slide-item class="machine-item" title="Disk Space To Allocate">17.2 GB</slide-item>
      <slide-item class="machine-item" title="$/GB">$ 0.43</slide-item>
      <slide-item class="machine-item" title="可用时长">1h</slide-item>
      <slide-item class="machine-item" title="$/GPU">$ 0.6</slide-item>
      <slide-item class="machine-item" title="GPU Count">4</slide-item>
      <slide-item class="machine-item" title="TFLOPS(Total)">4</slide-item>
      <slide-item class="machine-item" title="GPU RAM">4</slide-item>
      <slide-item class="machine-item" title="GPU RAM Bandwidth">4</slide-item>
      <slide-item class="machine-item" title="PICE Bandwidth">4</slide-item>
      <slide-item class="machine-item" title="Cpu Cores">4</slide-item>
      <slide-item class="machine-item" title="Cpu Ram">4</slide-item>
      <slide-item class="machine-item" title="Disk Bandwidth">4</slide-item>
      <slide-item class="machine-item" title="Inet Up">4</slide-item>
      <slide-item class="machine-item" title="Inet Down">4</slide-item>

    </div>
    <div class="info-wrap">
      <div class="flex status-title">
        <div>
          <span class="fs16">ID:ASDADASDASDHIUIHBYISADASD<span class="pl100">$ 0.404/hr</span></span>
        </div>
        <el-button style="width: 100px" type="primary" size="mini">租用</el-button>
      </div>
      <div class="flex">
        <div class="td">
          <div>2X RTX 2080TI</div>
          <div></div>
        </div>
        <div class="td">
          <div>
            Z10PE
          </div>
          <div class="cPrimaryColor fs12">
            PCIE 3.0, 16x 5.5GB/s
          </div>
        </div>
        <div class="td">
          <div>
            {{$t('gpu.totalTime')}}
          </div>
          <div class="cPrimaryColor">
            100h
          </div>
        </div>
        <div class="td">
          <div>Up Speed</div>
          <div class="cPrimaryColor fs12">26.7 Mbps</div>
        </div>
        <div class="td">
          <div>Down Speed</div>
          <div class="cPrimaryColor fs12">26.7 Mbps</div>
        </div>
      </div>
      <div class="flex">
        <div class="td">
          <div>Max Duration</div>
          <div class="cPrimaryColor fs12">1 mon, 28d</div>
        </div>
        <div class="td">
          <div>Max CUDA</div>
          <div class="cPrimaryColor fs12">1234</div>
        </div>
        <div class="td">
          <div>TFLOPS</div>
          <div class="cPrimaryColor fs12">36.6</div>
        </div>
        <div class="td">

        </div>
        <div class="td">
          <div class="cPrimaryColor">Xeon E5-2620 v3</div>
          <div class="cPrimaryColor fs12">12.0/24 Cores 64/129 GB</div>
        </div>
      </div>
      <div class="flex">
        <div class="td">
          <div>{{$t('gpu.storage')}}</div>
          <div class="cPrimaryColor fs12">2106MB/s  590.5GB</div>
        </div>
        <div class="td">
          <div class="cPrimaryColor">38.6 DLPerf</div>
          <div class="cPrimaryColor ps12">95.5 DLP/$/hr</div>
        </div>
        <div class="td">
          <div>{{$t('gpu.reliable')}}</div>
          <div class="cPrimaryColor fs12">98%</div>
        </div>
        <div class="td"></div>
        <div class="td"></div>
      </div>

    </div>

  </div>
</template>

<script>
  import DropItem from '@/components/machine/dropItem'
  import SlideItem from '@/components/machine/slideItem'

  export default {
    name: "list",
    data() {
      return {
        curVal: 0,
        images: [
          {
            name: 'TesorFlow',
            value: 1
          },
          {
            name: 'other',
            value: 2
          }
        ],
        machineTypes: [
          {
            name: '全部',
            value: 1
          },
          {
            name: '停机',
            value: 2
          }
        ]
      }
    },
    watch: {
      curVal(newVal) {

      }
    },
    components: {
      DropItem,
      SlideItem
    }
  }
</script>

<style lang="scss" scoped>
  .machineData-wrap {
    display: flex;
    flex-wrap: wrap;
    .machine-item {
      margin-right: 10px;
      margin-bottom: 40px;
    }
  }

  .info-wrap {
    padding: 15px 20px 12px;
    border: 1px solid #979797;
    color: #666;
    font-size: 14px;

    .status-title {
      padding-bottom: 17px;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;

      .td {
        width: 20%;
        line-height: 24px;

        .upSpeed, .downSpeed {
          display: inline-block;
          height: 16px;
          line-height: 16px;
          margin-right: 8px;
          border: 1px dashed #666;
          font-size: 14px;
        }

        .downSpeed {
          transform: rotateZ(180deg);
        }

        div {
          height: 24px;
        }
      }
    }
  }

</style>
