# 记录下遇见的latex牛掰的小技巧，又学到了！

## 一、解决latex文字不明原因超出正文区域

\begin{sloppypar}

。。。

\end{sloppypar}

直接解决！

附博主链接：http://t.csdn.cn/10SSE

## 二、目录问题

%目录

\tableofcontents

解决\charter*{}等带星号的标题加不进目录里，可用下方代码自行加入

**\addcontentsline{toc}{section}{xxxx}**

第二个{section}可更换，charter会有个加粗效果，顶行

其他标题会酌情缩进

如不想加粗，可在内容部分前面加入\normalfont，例\addcontentsline{toc}{chapter}{\normalfont  结论与建议}

**\setlength{\cftsecindent}{0pt}**           解决section标题在目录中的缩进效果

**\setlength{\cftsubsecindent}{0pt}**     解决subsection标题在目录中的缩进效果

## 三、公式编号问题

- latex 在 article 中公式默认是(1)、（2）... 编号，让公式按章节编号可以这样做：\numberwithin{equation}{section}

- 可是在 book 中，默认是按章节编号的：(1.1)、(1.2) ... (2.1)、(2.2)，取消公式按章节编号，可以这样做：

  \usepackage{chngcntr}

  \counterwithout{equation}{chapter}

  \counterwithout{equation}{section}

- chngcntr 宏包和 \counterwithout 命令参数含义，参考 tex 的帮助文档: texdoc chngcntr

## 四、表格宽度

Longtable表格设置同样宽度但是列数不一样就会两个表格不一样宽是什么原因呢

答：LaTeX表格单元格默认会有个左右边距为6pt，多一列就会多一点，所以才不一样宽，而且现在我们的表格大多数都是设置宽度综合为0.88，就是因为这个边距，所以可以用下面的方法进行消除整体的表格边距

```JavaScript
\setlength{\tabcolsep}{0pt} //导言区填写 ，全部表格受用，后续表格宽度总和可为1
```

## 五、表格单元格跨行内容换行、及换行后两行内容相距过高问题

- 如果是固定文本，

```JavaScript
\multirow{2}{*}{\shortstack{监测\\频次}}  //其中\shortstack{\\}包裹住的文本可以使用\\换行
                // \makecell{\\}  也可使其换行，但换行出的内容间距有点大
```

- 如果是变量文本，

``` JavaScript
\multirow{4}{0.15\textwidth}{\VAR{lists.point|escapeTex if lists.point}}
                // 用0.15\textwidth代替原有的 * ,使其在设置宽度下自动换行，这个0.15是表格本列的宽度 
```

上方换行会出现间距大，不算不美观，但是如遇要求一倍行距，可用下方操作

```JavaScript
\multirow{4}{0.15\textwidth}{\renewcommand{\baselinestretch}{0.8}\normalsize\zihao{5}\VAR{lists.point|escapeTex if lists.point}}
// \renewcommand{\baselinestretch}{0.8}\normalsize\zihao{5}  可使文本根据基线调整行距间距，是单独调整行距（\renewcommand\arraystretch{1}）调不动的情况下使用
```



## 六、图标编号问题

如果需要使用的是自定义目录、自定义标题，那么其标题下所出现的表及图的编号就会出现一个问题，就是没有根据所设置的标题进行排序（如下图），那么如何做才能达到想要的效果呢，往下看

```JavaScript
\renewcommand {\thetable} {\thechapter{}-\arabic{table}}	%设置表序号	\thechapter{}是根据标题序号
\renewcommand {\thefigure} {\thechapter{}-\arabic{figure}}	%设置图序号
\setcounter{table}{0}  %将表序号清零
\setcounter{figure}{0}  %将图序号清零
```

我们只需要这四句话就可以

例子，比如我现在搞了个标题10 是附表，所以是自定义的标题，但是下面的表格直接用\caption的话会接着标题9，变成9-1...

```JavaScript
\newpage
\noindent \textbf{\zihao{-3}10 \quad 附录} \par %一级标题 
\vspace{4pt}
\addcontentsline{toc}{chapter}{\normalfont 10 \quad 附录} 
//只需要下面这样，表格标题就会变成10-1往下排
\renewcommand {\thetable} {10-\arabic{table}}	%设置表序号
\setcounter{table}{0}  %将表序号清零
```

## 七、表格内换行，切垂直居中

```JavaScript
\multicolumn{1}{@{}l@{}|}{	//1为跨行列数 ，可以更改
    \begin{tabular}{p{0.15\textwidth}} //规则：  p{'width'} 居左 m{'width'} 居中 b{'width'} 居右
                     //内容换行用  \\      
    \end{tabular}
}
```

下方例子代码及截图

```tex
\begin{small}
    \begin{longtable}{
        |m{0.09\textwidth}<{\centering}| m{0.22\textwidth}<{\centering}| m{0.58\textwidth}<{\centering}|m{0.2\textwidth}<{\centering}|m{0.15\textwidth}<{\centering}|m{0.12\textwidth}<{\centering}|m{0.12\textwidth}<{\centering}|
    }
    \Xcline{1-7}{1.2pt}
    \textbf{序号} & \textbf{步骤名称} & \textbf{内容及要求} & \textbf{危险点分析} & \textbf{危险点控制} & \textbf{环境因素} & \textbf{预控措施} \\ \hline
    \endhead
    \Xcline{1-7}{1.2pt}
    \textbf{序号} & \textbf{步骤名称} & \textbf{内容及要求} & \textbf{危险点分析} & \textbf{危险点控制} & \textbf{环境因素} & \textbf{预控措施} \\ \hline
    \endfirsthead
    \Xcline{1-7}{1.2pt}
    \endfoot
    \endlastfoot
    1 & 收集原始资料 & \leftline{ 收集装置相关设计资料，相关设备的运行导则。} &  &  &  &  \\ \hline
    2 & 编制试验方案 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、根据收集到的原始资料和有关规程要求编制试验方案。\\
                      2、试验方案由专工及以上人员审核批准，委托方代表签字。\end{tabular}} &  &  &  &  \\ \hline
    3 & 到现场前的准备工作 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、按照清单对仪器设备和工器具检查，确保设备状态良好 \\
                            2、出公司登记：所有设备在运往现场前应进行出公司登记。\\
                            3、安排物流或联系车辆。\end{tabular}} 
                            &  &  &  &  \\ \hline
    4 & 到现场后的准备工作 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、测试仪器卸车后分类摆放整齐，现场有条件时可把部分测试仪器存放在现场，并做好委托及防盗工作。\\
                            2、与委托方取得联系，与电厂相关人员取得联系，办好测试人员、仪器以及车辆的出入证明。\end{tabular}} 
                            & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}仪器存放在现场时，列好现场存放仪器清单，并委托相关人员保管。防止仪器设备丢失。 \end{tabular}} 
                            & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}保管人员清点后在清单上签字。\end{tabular}}  &  &  \\ \hline
    5 & 试验前的准备工作 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、技术交底、安全交底及试验方案交底：试验前，试验负责人应向工作班成员、委托方进行交底包括工作内容、活动范围、安全注意事项、危险点分析及控制、试验方案等。\end{tabular}} 
                            & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}不进行交底或交底不全面，会造成工作班成员任务不明确，安全措施不了解等，可能会造成人身或设备事故。\end{tabular}}  
                            & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}严格实行交底制度，参加交底的所有人员均在记录上签字。 \end{tabular}} 
                            & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.12\textwidth}}使用标准气体对烟气分析仪或仪器进行自校准时，标准气体使用后排出的化学废气（SO$_2$、NO$_x$）。 \end{tabular}} 
                            &  \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.12\textwidth}}使用校准气体时应尽量在室外，如在室内应保证室内通风良好。\end{tabular}}  \\ \hline
    6 & 测试平台及仪器往测试平台的搬运 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、现场测试平台的检查，临时搭建的测试平台使用前必须经过检验合格并出具书面证明后方可使用。\\
                                       2、测试仪器往操作平台搬运时运的过程中注意安全，需要用绳子向测试平台搬运仪器时，确认仪器已经捆绑固定，在搬运过程中下面禁止站人，防止仪器摔落砸伤人。\end{tabular}}  
                                     & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}1、测试平台不安全可能导致测试人员伤亡及仪器设备的损害。\\
                                       2、仪器没有捆绑固定会导致仪器在搬运过程中从高空坠落，砸伤人、摔坏仪器。 \end{tabular}} 
                                     & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}1、测试平台需安检部门出具书面证明后方可使用。\\
                                       2、确认绳子结实可用，仪器捆绑固定方可向上搬运，搬运过程中下面禁止站人。\end{tabular}}  &  &  \\ \hline
    7 & 电源 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、部分试验仪器需要220V交流电源，接线工作由电厂运行人员完成，试验人员配合，严禁试验人员私自接线。\\
                  2、电源开关外壳和电线绝缘有破损不完整或者带电部分外漏时，应立即找电工修好，否则不准使用。\\
                  3、电源应经过安全检定，并粘贴有检定合格标签。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}1、在不知道线路负载的情况下私自接线可能会导致设备跳闸。\\
                  2、漏电可能导致测试人员伤亡或测试仪器损坏。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}1、发现有人触电，应该立即切断电源，使触电人脱离电源，并进行急救。\end{tabular}}  &  &  \\ \hline
    8 & 高空作业 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、担任高处作业人员必须身体健康。\\
                   2、测点旁边有护栏，在格栅式的平台上工作时，应铺设木板，防止工具和器材掉落。\\
                   3、较大的工具应用绳栓在牢固的构建上，不准随便乱放，防止从高空坠落发生事故。\\
                   4、不准将工具及材料上下投掷，要用绳系牢后往上或往下吊送。\\
                   5、测试人员必须系好安全带，安全带的挂钩或绳子应挂在牢固结实的构件上，禁止挂在移动或者不牢固的物件上。\\
                   6、除有关人员外，不准他人在工作地点的下面通行或者逗留，工作地点下面应有围栏或者其它保护装置，防止落物伤人。\\
                   7、在6级及以上的大风以及暴雨、打雷、大雾等恶劣天气，应停止露天高处作业。\\
                   8、气温低于-10℃时，做好防滑措施，必要时旁边有取暖设备；气温高于35℃时，必要时旁边有凉棚（遮阳伞），有防暑降温设施和饮料。\\
                   9、通讯设施处于备用状态。 \end{tabular}}
                 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}1、烟气测试工作大部分在尾部烟道上完成，属于高空作业，可能造成人员或仪器的坠落，造成人员伤亡和仪器设备损坏。\\
                   2、大风、雷电等恶劣天气可能导致人员、设备的吹落和雷击。\\
                   3、气温过低时人员容易摔倒，造成人员摔伤或测试仪器摔坏，气温过高时可能会导致测试人员中暑。\\
                   4、一旦发生安全事故，通讯设施能随时联系到相关人员。 \end{tabular}}
                 & \multicolumn{2}{@{}l@{}|}{\begin{tabular}{p{0.27\textwidth}}1、高空作业人员系好安全带，安全带要定期进行静荷重试验，确保安全带的性能可靠，安全带的挂钩或绳子应挂在牢固结实的构件上。\\
                                       2、测点旁边有护栏，在格栅式的平台上工作时，应铺设木板。\\
                                       3、工作地点的下面禁止无关人员通行，下面应有围栏或者其它保护装置。\\
                                       4、在6级及以上的大风以及暴雨、打雷、大雾等恶劣天气，停止露天高处作业。\\
                                       5、气温低于-10℃时，做好防滑措施，必要时旁边有取暖设备；气温高于35℃时，必要时旁边有凉棚（遮阳伞），有防暑降温设施和饮料。\\
                                       6、通讯设施完好。\end{tabular}} &   \\ \hline
    9 & 高温作业 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}便携式大流量低浓度烟尘自动测试仪测试烟气量、烟尘浓度等时，采样枪在烟道中移动，拿烟枪的测试人员要带石棉手套，防止烫伤。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}采样枪是金属表面，烟气温度较高，拿枪测试人员的手直接接触采样枪，容易烫伤。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}拿枪的测试人员要求带石棉手套，防止烫伤。\end{tabular}} &  &  \\ \hline
    10 & 化验 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}化验人员防止高温设备烫伤，应配备隔热手套；化学仪器的使用应按照正确步骤操作，确保安全。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}烘箱容易烫伤。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}从烘箱等处拿器皿时带隔热的石棉手套。\end{tabular}} &  &  \\ \hline
    11 & 仪器操作 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}仪器操作要严格按照仪器的操作步骤进行，烟气分析仪自检完成之前禁止把连接仪器的采样管插入烟道，测试结束后拔出采样管，在空气中清洗SO$_2$、NO$_x$、O$_2$等传感器，SO$_2$、NO$_x$读数小于10ppm后方可关掉仪器。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}仪器自检完成之前把连接仪器的采样管插入烟道或者SO$_2$、NO$_x$等传感器读数很高就关机导致传感器损坏。 \end{tabular}}
                & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}烟气分析仪自检完成之前禁止把采样管插入烟道，测试结束后拔出采样管，在空气中清洗SO$_2$、NO$_x$、O$_2$等传感器，SO$_2$、NO$_x$读数小于10ppm后方可关掉仪器。\end{tabular}} &  &  \\ \hline
    12 & 试验结束 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.58\textwidth}}1、试验全部正常结束后，由工作人员断开试验电源，拆除所有试验接线，拆除临时安全措施,试验负责人负责检查。\\
                    2、向委托方说明现场测试工作结束。\\
                    3、清点所有试验设备和工器具，仪器装箱，设备装车。\\
                    4、打扫卫生，保持现场清洁。\\
                    5、办理交接手续，返回公司里。 \end{tabular}}
                 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.2\textwidth}}断开电源开关之前进行拆线工作，可能会造成人身触电事故。 \end{tabular}}
                 & \multicolumn{1}{@{}l@{}|}{\begin{tabular}{p{0.15\textwidth}}断开电源之前，禁止任何人进行拆线工作。\end{tabular}} &  &  \\ \hline
    13 & 后续工作 & \multicolumn{5}{@{}l@{}|}{\begin{tabular}{p{1.17\textwidth}}1、回公司及时卸车，办理仪器设备回公司登记手续。\\
                    2、到实验室委托现场取测试样品。\\
                    3、编写试验报告，按规定交付,并保存好现场有关原始记录。\end{tabular}} \\ \hline
    14 & 安全汇报 & \multicolumn{5}{@{}l@{}|}{\begin{tabular}{p{1.17\textwidth}}1、若在试验中发生有异常情况（包括人身、试验设备、被试设备等）时，试验负责人马上向技术中心主任、公司安全专责等相关领导汇报备案。\\
                    2、若试验正常结束，回公司后应及时向公司安全员汇报备案。\end{tabular}}  \\ \hline
    \Xcline{1-7}{1.2pt}
    \end{longtable}
\end{small}
```



## 八、展示图片，指定容器大小保证原图比例

```latex
\begin{center}
    附图1：
    \begin{figure}[H]
        \centering
        \includegraphics [width=14.664cm,height=6.624cm,keepaspectratio] {image图片}
    \end{figure}
\end{center}

上述代码中：
width=14.664cm,height=6.624cm ：指定防止图片的容器宽高
keepaspectratio ： 这个是控制图片比例不变的
```

