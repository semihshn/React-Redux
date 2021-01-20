# React

 React , kullanıcı arayüzü oluşturmaya yarayan açık kaynak kodlu web uygulama çatısıdır. 
 Facebook önderliğinde bir geliştirici grubu tarafından geliştirilmekte olan React, 
 Model-View-Controller prensibine uygun olarak oluşturulmuştur.

# Redux

 React js de componentler arası iletişim kurmak hayli zordu , bir ağaç veri yapısı 
 hayal edersek root düğümümüz main componentimiz oluyordu ve diğer tüm yapraklara yani
 componentlere burdan , main component'den "Component Drilling" yöntemiyle 
 state'lerimizi yani verilerimizi yolluyorduk ve bu işlem tek seferde olmuyordu mesela
 root düğümünün torun düğümüne veri yolanacaksa önce çocuğu olan düğüme veriyi yolluyor 
 çocuk da kendi çocuğu olan düğüme aktarıyordu , küçük projelerde bu durum çok can 
 sıkmazken büyük projelerde "Repeat Yourself" mentalitesine ters düşüyordu , o yüzden
 redux verileri componentlere main component'den dağıtmak yerine Store dediğimiz bir 
 yapı tasarlayıp buradan tek seferde istenilen componente yollamayı akıl etti ve bizi 
 Store , Reducer ve Action gibi yapılarla tanıştırdı , kodlarda da Redux mentalitesini 
 kullanarak Crud işlemleri yaptık.