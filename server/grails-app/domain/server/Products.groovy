package server

class Products{
    static mapping = {
         table 'Products'       
         version false
         id generator:'identity', column:'productId'    // assigned que yo los asigno  
         categoryId column: 'categoryId'
         id column: 'id' // id que asocia a tabla con existence line 
         dynamicUpdate true
         dynamicInsert true
         sort 'name'         
    }    
   
    String name 
    String barCode
    String serialCode
    String placeName
    Category categoryId
    
    
    static belongsTo=[Category]   // depende de o es hijo de categoria   
    static hasMany=[existenceLine: ExistenceLine, purchasesDetail: PurchasesDetail, billDetail: BillDetail] // marca la relaciòn 
   
    static constraints={
        name(nullable: false, size: 0..60)   
        barCode(nullable:true, size: 0..15)
        placeName(nullable: true, size: 0..50)
        serialCode(nullable: true, size: 0..10)
    }
    
    String toString() {
        return "${name}" 
    }
}
