---
layout: post
title: "Bir Hibrit Mobil Uygulamanın Anatomisi, Bölüm 1: Teknoloji"
date: 2016-04-10 20:05:00 +0300
excerpt: Bu yazı serisinde, hibrit mobil uygulama teknolojilerine merak salmam sonucunda ortaya çıkan ekşibişi adlı gayri resmi ekşisözlük uygulamasının geliştirme sürecinde edindiğim tecrübelerden bahsedeceğim. Serinin bu bölümü, hibrit mobil uygulama geliştirme teknolojilerinin tanıtımına ve işleyiş şekillerinin anlatılmasına dayalı olacak.
categories: typography
---
Ellerimizden düşürmediğimiz mobil cihazlar artık hayatımızın ayrılmaz bir parçası ve hızla gelişmeye ve evrimleşmeye devam ediyorlar. Bu gelişimlerin birer meyvesi olan mobil bazlı bir çok başarılı internet start-up’ı da yoluna büyük miktarlarda yatırımlar alarak devam ediyor. Haliyle, mobil uygulama pazarı da bu sürece bağlı olarak sürekli olarak büyüme gösteriyor. Peki, mobil uygulama geliştirmesini sağlayacak programlama dillerine ve platform bazlı API’lere hakimiyeti bulunmayan biz arayüz geliştiricileri, -mükemmel bir fikrimiz olsun ya da olmasın- bu gelişmelerinden dışında mı kalıyoruz?

## Cordova
Sorunun cevabı hayır. Ve tam bu noktada araya Adobe şirketinin sahibi olduğu [PhoneGap](http://phonegap.com/) framework’ünün, Apache Foundation’a bağışlanarak açık kaynaklı hale getirilen hali olan [Cordova](http://cordova.apache.org/) giriyor. Cordova’nın çalışma prensibi, sağladığı JavaScript API’leri sayesinde, iOS, Android gibi platformların native özelliklerine erişim imkanı edindiğimiz HTML, CSS ve JavaScript’ten oluşan web uygulamalarının, yine bu platformların bir parçası olan WebView bileşeninin içinde gösterilmesinden oluşuyor. Daha basit bir dille anlatırsak: aslında yapılan uygulamalar, çeşitli UI elementlerini kullanan native uygulamalar olmak yerine, cihazların native işlevlerine erişim imkanı olan ve tek bir UI elementi (WebView) içinde, mobil bir tarayıcıdaymış gibi çalışan birer web uygulaması oluyor.


<figure class="image">
    <img data-action="zoom" src="{{ site.url }}/assets/post-images/2016/cordova-diagram.png" alt="Cordova/PhoneGap çalışma şeması.">
    <figcaption data-title-align="left top">Cordova/PhoneGap çalışma şeması.</figcaption>
</figure>

Cordova ile geliştirilen mobil uygulamaların en büyük avantajı; native işlevlere de erişen aynı uygulamayı, Android için Java, iOS için Objective-C kodlamak gibi ekstra hiçbir uğraş gerektirmeden birden fazla platform için oluşturabilmek. Bunu mümkün kılan ise, yukarıdaki şemada da gösterildiği gibi, Cordova’nın sahip olduğu eklentilerin sunduğu ve platform özelliklerine erişim imkanı sağlayan JavaScript API’leri.

Şu anda hem, kamera, pusula, lokasyon, depolama gibi önemli native işlevler, hem de diğer farklı işlevlere erişebilmek için toplamda **1565** adet eklenti, Cordova için eklentilerin bulunduğu bir kütüphane olan [PlugReg](http://plugreg.com/)'de mevcut durumda bulunmakta. Erişmek istediğiniz veya yapmak istediğiniz işlevler için halihazırda bir eklenti bulunmuyorsa, yeni bir eklenti kodlama imkanınız da her zaman bulunuyor. Ekşibişi adlı uygulamayı geliştirirken, ekşisözlük’ten veri almak ve ekşisözlük’e veri yollamak için benim izlediğim yol da tam olarak bu idi (Bu vesileyle JAVA’ya da ister istemez biraz giriş yapmış oldum :grin:). Cordova eklentisi kodlama kısmına, bu yazı serisinde detaylı olarak girmeyeceğim. Ancak, ileride bu konu üzerine ayrı bir yazı yazmayı planlıyorum.

### Hiçbir Şey Mükemmel Değildir
Her gülün bir dikeni olduğu gibi, Cordova ile hibrit mobil uygulama geliştirmenin de tabi ki dezavantajları bulunmakta. Bunlardan ilki, hala tam olarak standart halini almamış olan ya da geç standartlaşmış ve işletim sistemi güncellemesi almamış olan eski cihazlarda bulunmayan HTML5 API’leri. Bu problem, genel olarak Android platformunda, Android güncellemelerinin cihaz üreticilerinin insafına kaldığı için can sıkabiliyor. Ancak, Apple’da son zamanlarda yayınladığı her iOS güncellemesinde, farklı bir HTML5 API’sini bozmayı başararak bizlere saç baş yoldurmayı başarıyor.

Hibrit mobil uygulama geliştirirken, ben de dahil olmak üzere, bir çok geliştiricinin başını ağrıtan diğer bir dezavantaj ise, Android platformunda bulunan cihaz çeşitliliği ve bu cihazların farklı tarayıcı motorlarının farklı versiyonlarına sahip olması. Başta, bu konunun sadece HTML5 API’leri konusunda sıkıntı çıkarılacağı düşünülebilir (kendimden biliyorum), ancak sorun ne yazık ki o kadar da basit değil. Cihazlar arasındaki tarayıcı motorlarında bulunan bu farklılıklar, CSS render tutarsızlıklarına ve animasyon, geçiş efekti gibi kısımlarda performans kaybına da yol açabilmekte, ve uygulamanızın mükemmel bir mobil arayüze sahip olmasını istiyorsanız, insanı sinir hastası yapabilecek boyuta ulaşabilmekteler.

İşte tam bu noktada, tarayıcı motorlarının cihazlar arasında ayrışmasından kaynaklanan bütün bu farklılıkları giderebilmek için, yardımımıza bir başka açık kaynaklı araç koşuyor.

## Crosswalk
[Crosswalk](https://crosswalk-project.org/)'un işlevi çok basit: mobil uygulamanızı, uygulamanızın çalıştığı cihazın WebView elementi yerine, uygulamanızın içine entegre edilecek olan Google Chromium’un en son sürümünü kullanan bir WebView elementi ile çalıştırmak. Böylece, hem cihaz farklılıklarından ileri gelen dertlerden kurtulmuş, hem de mevcut durumdaki en son HTML5 API’lerini, markası veya modeli ne olursa olsun, mobil uygulamanızın çalışacağı bütün cihazlarda kullanabilme şansına erişmiş oluyorsunuz.

<figure class="image">
    <img data-action="zoom" src="{{ site.url }}/assets/post-images/2016/crosswalk-score.png" alt="Crosswalk HTML5 Skoru">
    <figcaption>Crosswalk’un HTML5 puanı ve Android sürümlerindeki WebView puanları ile karşılaştırması. Detaylarına ulaşmak için 
    <a href="http://html5test.com/compare/browser/9cbef32ae5c9ace9/android-5.0/android-4.4/android-4.2/android-4.0.html">buraya</a> tıklayabilirsiniz.</figcaption>
</figure>

Crosswalk da yine yanında bir kaç dezavantaj ile geliyor. Ancak, bu dezavantajlar, getirdiği avantajların yanında kayda değer bir negatif etki yaratmıyor. Crosswalk’un avantaj ve dezavantajlarını aşağıdaki gibi sıralayabiliriz:

### Avantajlar
- Açık kaynaklı ve bir çok geliştiricinin katkısıyla aktif olarak geliştirilmekte ve güncellenmekte olan bir proje.
- En son sürüm Chromium tabanlı bir WebView sağladığı için, cihazlar arasındaki ayrışmadan etkilenmeden, tutarlı bir render performansı sunması.
- Bütün cihazlarda en son çıkan ve hala geliştirilmekte olan API’leri kullanma imkanı.
- Mobil platformlar hedef alınarak geliştirildiği ve buna göre optimize edildiği için, daha iyi HTML, CSS ve JavaScript performansı sağlaması.
- WebGL, WebRTC, Vibration gibi geniş desteğe sahip olmayan API’leri dahi, bütün cihazlarda kullanabilme imkanı vermesi.

### Dezavantajlar
- Sadece Android versiyonu 4 ve üstü cihazlar için destek vermesi.
- Kullanıldığı uygulamaların boyutunu yaklaşık 20-25 MB kadar artırması.
- Uygulamanızın APK dosyasını, ARM ve X86 mimarileri için birleştirilmiş tek bir APK yerine, farklı iki APK halinde vermesi.

Crosswalk olmadan hibrit bir mobil uygulama geliştirmek, Android platformunun durumu göz önüne alındığında ve sağladıklarına baktığımızda, gerçekten de çok uğraş verici bir süreç. Gelecekte geliştireceğim uygulamalarda, Android cihazlardaki durum biraz daha iç açıcı olana kadar, Crosswalk benim için vazgeçilmez bir araç olacak.

## Ionic Framework
[Ionic](http://ionicframework.com/); 2013 yılının sonlarına doğru ortaya çıkan ve gücünü Google geliştiricilerinin elinden çıkmış olan [AngularJS](https://www.angularjs.org/)'ten alan, hibrit mobil uygulamalar oluşturmak için geliştirilen açık kaynaklı bir front-end kütüphanesidir.

Öncelikle, Ionic, diğer front-end kütüphanelerine nazaran sadece bir UI kütüphanesi değil. Yanlış anlaşılmasın, sadece bir UI kütüphanesi değil diye kötü bir şey olduğu için söylemiyorum. Tam tersine, bunu, Ionic’in hibrit mobil uygulama geliştirme sürecini ciddi anlamdan kısaltan ve kolay kılan diğer bir çok bileşene sahip olduğunu bildiğim için söylüyorum. *“Peki, nedir Ionic’i bu kadar farklı kılan?”* denildiğini duyar gibiyim. Bu sorunun cevabı, Ionic Framework’ü ilk açıklarken kurduğum cümlede gizli: **AngularJS**.

Ionic, tamamen AngularJS üzerine, AngularJS’in gücünü ve geliştiricilere sağladığı kolaylıkları kullanmak için oluşturulmuş ve ona göre optimize edilmiş bir mobil framework. Yani, Ionic ile başlamış olduğunuz projeler aslında birer AngularJS projesi oluyor, ve dolayısıyla, Ionic ile mobil geliştirme yapmak için AngularJS bilgisine sahip olmak da doğal bir zorunluluk halini alıyor. Eğer, JavaScript bilgisi iyi olan bir geliştirici iseniz (Ionic’ten bağımsız olarak bir mobil geliştirme yapacak olsanız dahi, JS bilgisine sahip olmanız zaten bir gereklilik), AngularJS’in yapısını anlamanız, web’deki çeşitli dersler sayesinde hiç de zor olmayacaktır. Dolayısıyla, bu noktada gözünüzü korkutacak bir durum bulunmuyor.

Ionic, yazıda bahsettiğimiz UI bileşenlerini, birer Angular directive‘i olarak sunuyor. Bu olanak, standart UI elementlerini çok daha güçlü kılıyor. Örneğin; standart liste elementleri oluştururken, Ionic’in sunduğu Angular directive’i olan `ion-list` elementini kullandığımızda, oluşturulan elementlere, swipe vb. gibi bir kaç özelliği de çok kolaylıkla ekleyebiliyoruz.

UI elementleri dışında, Ionic sayesinde sahip olduğunuz başka bir şey ise UX elementleri. Kütüphane bünyesinde, [pull-to-refresh](http://ionicframework.com/docs/api/directive/ionRefresher/), [infinite scroll](http://ionicframework.com/docs/api/directive/ionInfiniteScroll/), [loading indicator](http://ionicframework.com/docs/api/service/$ionicLoading/) vb. elementlerin de arasında bulunduğu bazı UX elementleri de bulunuyor ve bu elementlerin entegrasyonu, bir önceki paragrafta belirttiğimiz gibi birer Angular directive’i oldukları için çok çok kolay.

Bahsetmemiz gereken bir başka Ionic kolaylığı ise, sağladığı komut satırı arayüzü. Komut satırı arayüzü ile gelen komutları ikiye ayırabiliriz: standart Cordova komutları ve Ionic’e özel komutlar. Standart Cordova komutlarını, `emulate`, `run` ve `build` gibi, Cordova’nın sahibi olduğu komutlar oluşturuyor. Bu komutların varlığı doğal olarak ekstra bir özellik teşkil etmiyor. İşte bu ekstra diye nitelendirdiğimiz alanı, Ionic’e özel olan komutlar dolduruyor. Ionic bu komutlara ek olarak `serve`, `resources` ve `upload` gibi çok faydalı ek komutlar, ve `--livereload` gibi parametreler sunuyor. Örneğin; belirttiğim `serve` komutu, aşağıdakine benzer bir tarayıcı penceresinde, uygulamanızın iOS ve Android platformlarındaki görünümünü, yaptığınız değişikliklere duyarlı bir şekilde canlı olarak test etmenize olanak sağlıyor. Komut satırı arayüzü ile ilgili detaylı bilgiye [buraya](http://ionicframework.com/docs/cli/) tıklayarak ulaşılabilir.

<figure class="image">
    <img data-action="zoom" src="{{ site.url }}/assets/post-images/2016/ionic-lab.png" alt="Ionic Lab Arayüzü">
    <figcaption data-title-align="right top">Uygulamanızın iOS ve Android platformlarındaki görünümünü, yaptığınız değişikliklere 
    duyarlı bir şekilde canlı olarak test etmenize olanak sağlayan Ionic Lab arayüzü.</figcaption>
</figure>

Ionic’in, açık kaynaklı olarak geliştirilen bir framework olması, geliştirilecek olan orta ve büyük çaplı projelerde kullanımı düşünüldüğünde, *“Olur da bir gün geliştirme süreci durursa ne olacak?”* gibi soruları da beraberinde getirmiş olabilir. Ancak, burada da korkulacak bir durum söz konusu değil, çünkü, Ionic’i geliştirmekte olan [Drifty](http://drifty.com/) adlı firma, bu sene içinde 2.6 milyon dolarlık bir yatırım daha aldı ve bunun da vermiş olduğu doping ile Ionic üzerindeki etkinlikleri şu anda hiç yabana atılacak gibi değil. Hem Angular 2 üzerine aktif olarak inşa edilmekte olan Ionic 2 şu anda alpha aşamasında, hem de Ionic 1‘in aktif olarak geliştirilmesine hala devam ediliyor. Bununla beraber, Ionic’i, analytics, push ve builder gibi servislerin de bulunduğu tam donanımlı bir platform haline getirmek için de çalışmalarını sürdürüyorlar. Bu platform hakkındaki detaylı bilgiye **ionic.io** adresinden ulaşabilirsiniz.

## Son Sözler
Native mobil uygulamaların sahip olduğu güç, ve avantajları tabi ki yadsınamaz bir gerçek. Ancak, hem evrilmekte olan web teknolojileri, hem de gelişmekte olan akıllı telefon donanımları sayesinde, hibrit mobil uygulamalar, native uygulamalar ile aradaki performans farkını giderek kapatmaya başlamış durumdalar. Ayrıca, yazıda da bahsettiğimiz gibi, her platform için ayrı ayrı uygulama kodlamak yerine, tek bir codebase ile birden fazla platform için uygulama oluşturmak da, hibrit mobil uygulamaları göz ardı edilemez bir seçenek haline getiriyor.

Yazı serisinin bir sonraki bölümünde, bu yazıda bahsettiğimiz teknolojilerin kurulum ve kullanımına giriş yapacağız. O zamana kadar hoşçakalın.