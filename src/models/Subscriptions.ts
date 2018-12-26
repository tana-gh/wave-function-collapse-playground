import * as Rx    from 'rxjs'
import * as Redux from 'redux'

export default class Subscriptions {
    private subscriptions: (Rx.Subscription | Redux.Unsubscribe)[] = []

    add(...subscriptions: (Rx.Subscription | Redux.Unsubscribe)[]) {
        subscriptions.forEach(x => this.subscriptions.push(x))
    }

    unsubscribeAll() {
        this.subscriptions.forEach(x => {
            x instanceof Rx.Subscription ? x.unsubscribe() : x()
        })
    }
}
