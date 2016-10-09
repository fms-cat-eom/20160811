# Everyday One Motion - 20160811  

"Polygon Triangulation"  

![](20160811.gif)  

JavaScript, Canvas  

[Everyday One Motion](http://motions.work/motion/353)  
[Demo Page](http://fms-cat-eom.github.io/20160811/dist)  

## Polygon Triangulation

今回は念願のPolygon Triangulationを実装しました。ポリゴン野郎への第一歩ですね。  

二次元図形を3Dで表示するには、多くの場合は図形は三角形の集合として描画します。そのため、図形を三角形の集合へ変換する作業が必要となります。  
ところが、任意の図形を三角形のみで構成する、というのはそんなに簡単な作業ではありません。人の手でちまちまやるのも大変ですし、機械でやるためのアルゴリズムの実装も大変です。  

一番簡単なアルゴリズムとして、Ear Clippingという手法があるようです。  
穴のない任意の図形には必ず、三角形で構成できる「耳」があり、その耳を図形が無くなるまで切り取っていくことによって、最終的に三角形だけで図形を構成するやり方が分かる、というものです。  
以下のURLが詳しい資料となります。  
https://www.geometrictools.com/Documentation/TriangulationByEarClipping.pdf  

想像以上にアルゴリズムが大変で、最終的に出来上がったコードはかなりヤバイ状態になっています……  
