export class Trade {
    public Id:String;
    public Date:Date;
    public StockSymbol:string;
    public IsPurchase:boolean;
    public Quantity:number;
    public Price:number;

    public CurrentQuantity:number;
    public SaleProfitLoss:number;
}