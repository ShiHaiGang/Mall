### Hammer Event object

> http://hammerjs.github.io/

| Name            | Value                                                        |
| :-------------- | :----------------------------------------------------------- |
| type            | 事件的名称。像 “panstart”。                                  |
| deltaX          | X 轴的移动。                                                 |
| deltaY          | Y 轴的移动。                                                 |
| deltaTime       | 从第一次输入到 ms 的总时间。                                 |
| distance        | 移动的距离。                                                 |
| angle           | 移动的角度。                                                 |
| velocityX       | X 轴上的速度，单位是 px/ms。                                 |
| velocityY       | Y 轴上的速度，单位是 px/ms。                                 |
| velocity        | 最高速度 X/Y 值。                                            |
| direction       | 方向移动。匹配 `DIRECTION` 常量。                            |
| offsetDirection | 从起点开始的方向。匹配`DIRECTION` 常量。                     |
| scale           | 当多点触控时，缩放已经完成。1次触摸。                        |
| rotation        | 旋转(在deg中)，这是在多点触控时完成的。一次触摸0次。         |
| center          | 多点触控的中心位置，或者只有一个指针。                       |
| srcEvent        | 源事件对象，类型 `TouchEvent`, `MouseEvent` or `PointerEvent`. |
| target          | 目标接收到事件。                                             |
| pointerType     | 主指针类型可以是 `touch`, `mouse`, `pen` or `kinect`.        |
| eventType       | 事件类型，匹配 `INPUT` 常量。                                |
| isFirst         | `true` 当第一次输入。                                        |
| isFinal         | `true` 当最后一次输入时。                                    |
| pointers        | 包含所有指针的数组，包括结束指针(`touchend`, `mouseup`).     |
| changedPointers | Array with all new/moved/lost pointers.                      |
| preventDefault  | Reference to the `srcEvent.preventDefault()` method. Only for experts! |